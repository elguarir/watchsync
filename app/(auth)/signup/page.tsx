import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import SignUpForm from "@/components/auth/signup-form";
import Image from "next/image";
// import Illustration from "@/public/images/registration-illustration.svg";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container grid flex-col items-center justify-center w-screen h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="items-center justify-center hidden h-full bg-muted lg:flex">
        <Image
          src="images/registration-illustration.svg"
          alt="Registration Illustration"
          className="w-[28rem] 2xl:w-[36rem]"
        />
      </div>
      <div className="w-screen px-6 lg:w-auto lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[350px]">
          <div>
            <div className="flex flex-col mb-6 space-y-2 text-center">
              {/* <Icons.logo className="w-6 h-6 mx-auto" /> */}
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignUpForm />
            {/* <p className="px-8 text-sm text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-brand underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-brand underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
