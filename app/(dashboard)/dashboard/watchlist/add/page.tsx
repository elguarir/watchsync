import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function WatchlistAdd() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/watchlist/"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <>
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Back
          </>
        </Link>
      </div>
    </div>
  );
}
