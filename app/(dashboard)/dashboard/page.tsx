import React from "react";

import { Metadata } from "next";
import { TitleResults } from "@/types/titles";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TitlesSlider from "@/components/TitlesSlider";
import "./styles.css";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track, Discover, and Rate Your Favorite Movies and TV Shows.",
};

export default async function Dashboard() {
  let upcomingMovies = await GetUpcomingMovies();

  let popularMovies = await GetPopularMovies();

  let topRatedMovies = await GetTopRatedMovies();
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-medium font-general">
        Discover. Track. Rate.
      </h1>
      <div className="flex flex-col pb-8 space-y-1">
        <div>
          <h2 className="mt-6 text-muted-foreground">— Upcoming Movies</h2>
          <div className="relative">
            <TitlesSlider titles={upcomingMovies} />
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={"/movies/upcoming"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "flex items-center gap-1.5"
              )}
            >
              <span>View All</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1.25em"
                width="1.25em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-muted-foreground">— Trending Movies</h2>
          <div className="relative">
            <TitlesSlider titles={popularMovies} />
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={"/movies/trending"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "flex items-center gap-1.5"
              )}
            >
              <span>View All</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1.25em"
                width="1.25em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-muted-foreground">— Top Rated Movies</h2>
          <div className="relative">
            <TitlesSlider titles={topRatedMovies} />
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={"/movies/top-rated"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "flex items-center gap-1.5"
              )}
            >
              <span>View All</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1.25em"
                width="1.25em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const GetPopularMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=18bbc44d1e9834345fa7cd8f22c77cee&language=en-US&page=1`
  );
  const data: any = await res.json();
  return data as TitleResults;
};

const GetUpcomingMovies = async () => {
  let now = new Date();
  let next3Month = new Date(
    now.getFullYear(),
    now.getMonth() + 3,
    now.getDate()
  );
  const range = [
    now.toISOString().split("T")[0],
    next3Month.toISOString().split("T")[0],
  ];

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&primary_release_date.gte=${range[0]}&primary_release_date.lte=${range[1]}&sort_by=popularity.desc&api_key=18bbc44d1e9834345fa7cd8f22c77cee`
  );
  const data: any = await res.json();
  return data as TitleResults;
};

const GetTopRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=18bbc44d1e9834345fa7cd8f22c77cee&language=en-US&page=1`
  );
  const data: any = await res.json();
  return data as TitleResults;
};
