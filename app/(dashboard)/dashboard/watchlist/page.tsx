import React from "react";
import data from "./movies.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <AddMovieDrawer />
      </div>

      <Tabs defaultValue="all" className="flex flex-col pt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="watched">Watched</TabsTrigger>
          <TabsTrigger value="favourites">Favourites</TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4"
        >
          {movies.results.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
