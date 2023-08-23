"use client"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

export default function ProgressBarWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ProgressBar
        color="#F97316"
        shallowRouting
        options={{ showSpinner: false }}
      />
      {children}
    </>
  );
}
