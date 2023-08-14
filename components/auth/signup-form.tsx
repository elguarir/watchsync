"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Button, buttonVariants } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { SignUpValidate } from "@/lib/formvalidation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignUpForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: SignUpValidate,
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setIsLoading(false);
      const data = await res.json();
      if (!res.ok) {
        Object.keys(data.errors).forEach((key) => {
          toast.error(data.errors[key], { duration: 2000 });
        });
      } else {
        setSuccess(true);
      }
    },
  });

  return (
    <>
      {success ? (
        <>
          <div className="relative flex flex-col items-center justify-between p-4 mb-6 text-sm text-green-800 border rounded-lg bg-green-50 dark:bg-green-500/10 dark:text-green-500 border-green-500/10">
            <div className="flex items-center mb-2 space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 text-green-700 rounded-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h6 className="text-base scroll-m-20">
                <span className="text-base font-semibold">
                  Your account has been created successfully.
                </span>
              </h6>
            </div>
            <p className="font-medium">
              You can now login to your account and start using WatchSync.
            </p>
          </div>
          <div className="flex justify-center w-full">
            <Button asChild variant={"outline"} className="w-40">
              <Link className="flex items-center" href="/login">
                Login here
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0.2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-4 h-4 ml-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className={cn("grid gap-5", className)} {...props}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3">
              <div className="grid gap-3">
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    autoCorrect="off"
                    disabled={isLoading || isGoogleLoading}
                    {...formik.getFieldProps("name")}
                  />
                  {formik.errors?.name && formik.touched.name && (
                    <p className="px-1 text-xs font-[500] text-red-500/90">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading || isGoogleLoading}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.errors?.email && formik.touched.email && (
                    <p className="px-1 text-xs font-[500] text-red-500/90">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="******"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isLoading || isGoogleLoading}
                    {...formik.getFieldProps("password")}
                  />
                  {formik.errors?.password && formik.touched.password && (
                    <p className="px-1 text-xs font-[500] text-red-500/90">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className={cn(buttonVariants())}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 mr-2 animate-spin"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Signin Up...
                  </>
                ) : (
                  "Sign Up with Email"
                )}
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
              setIsGoogleLoading(true);
              signIn("google", { callbackUrl: "/dashboard" });
            }}
            disabled={isLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2 animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <FcGoogle className="w-4 h-4 mr-2" />
                Continue with Google
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
