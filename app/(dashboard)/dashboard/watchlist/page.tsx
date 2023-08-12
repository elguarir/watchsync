import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import data from "./movies.json";
import { PlusIcon } from "@radix-ui/react-icons";
import { MovieResults } from "@/types/movies";
import MovieCard from "@/components/MovieCard";
import { AddMovieDrawer } from "@/components/AddNewMovieDrawer";
const movies: MovieResults = data;

export default function Watchlist() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-wide font-general">
          Your watchlist
        </h1>
        {/* <Button asChild size={"sm"}>
          <Link href="/dashboard/watchlist/add" className="flex items-center">
            <PlusIcon className="mr-2" />
            Add
          </Link>
        </Button> */}
        <AddMovieDrawer />
      </div>
      <div className="flex flex-col pt-4">
        {/* titles list */}
        <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4">
          {movies.results.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
