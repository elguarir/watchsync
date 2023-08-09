"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { buttonVariants } from "./ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
export default function SignInForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div className={cn("grid gap-5", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
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
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading
              ? //   <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                "Signin in..."
              : "Sign In with Email"}
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
          signIn("google", { callbackUrl: "https://watchsync.net/dashboard" });
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          "Signing in..."
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
