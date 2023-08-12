"use client";

import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
export default function MoviesSearch() {
  const [query, setQuery] = React.useState<string>();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (query === "") return;
    e.preventDefault();
    router.push(`/dashboard/movies?query=${query}`);
  };

  return (
    <div className="w-full ">
      <form
        className="relative flex items-center w-full space-x-2"
        onSubmit={handleSubmit}
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          name="query"
          id="query"
          className="px-4"
          placeholder="Search for movies, tv shows"
          type="text"
        />
        <Button size={"icon"} variant={"outline"} className="w-12">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21,21l-3.68774-3.68774"
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3,11.379A8.379,8.379,0,1,0,11.379,3h0A8.37962,8.37962,0,0,0,3,11.379"
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </Button>
      </form>
    </div>
  );
}
