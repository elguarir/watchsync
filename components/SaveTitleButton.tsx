"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";

export default function SaveButton({
  titleId,
  type,
}: {
  titleId: number;
  type: string;
}) {
  const router = useRouter();

  async function handleAddToWatchlist() {
    setLoading(true);
    try {
      const res = await fetch("/api/users/watchlist/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          titleId: titleId,
          type: type,
          isWatched: false,
          isFavourite: false,
          rating: null,
        }),
      });
      const data = await res.json();
      toast.success("Added to watchlist!", {
        className: "dark:bg-muted dark:text-orange-50",
      });
      router.refresh();
      router.push("/dashboard/watchlist");
    } catch (error) {
      toast.error("Something went wrong", {
        className: "dark:bg-muted dark:text-orange-50",
      });
    }
    setLoading(false);
  }

  
  const [loading, setLoading] = useState(false);
  return (
    <Button
      size={"xs"}
      className="text-sm"
      onClick={() => handleAddToWatchlist()}
    >
      {loading ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="ml-2">Adding...</span>
        </>
      ) : (
        <>
          <PlusIcon className="mr-2" />
          Watchlist
        </>
      )}
    </Button>
  );
}
