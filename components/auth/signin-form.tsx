"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { buttonVariants } from "../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
export default function SignInForm({
  className,
  error,
  ...props
}: {
  className?: string;
  error?: string;
}) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  if (error) {
    router.push("/login?error=invalid-credentials");
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },

    onSubmit: async (values) => {
      setIsLoading(true);
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      setIsLoading(false);
    },
  });
  return (
    <div className={cn("grid gap-5", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-3">
            <div className="flex flex-col space-y-1">
              <Label className="text-sm" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                type="email"
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
            {error && (
              <div className="flex items-center p-2 space-x-2 rounded-md bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334z"
                    fill="#fb5555"
                    stroke="#fb5555"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4.583a.75.75 0 0 1 .75.75V8a.75.75 0 0 1-1.5 0V5.333a.75.75 0 0 1 .75-.75z"
                    fill="#fff"
                  />
                  <path
                    d="M8.667 10.667a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0z"
                    fill="#fff"
                  />
                </svg>
                <p className="text-sm text-center text-red-500">
                  Invalid email or password.
                </p>
              </div>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
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
                Signin in...
              </>
            ) : (
              "Sign In with Email"
            )}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">Or</span>
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
            Signin in...
          </>
        ) : (
          <>
            <FcGoogle className="w-4 h-4 mr-2" />
            Continue with Google
          </>
        )}
      </button>
    </div>
  );
}
