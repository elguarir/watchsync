import React from "react";
import { MovieResults, Movie } from "@/types/movies";
import MovieCard from "@/components/MovieCard";
import { Card } from "@/components/ui/card";
import MoviesSearch from "@/components/MoviesSearch";


export default function Loading() {
  
  return (
    <div className="flex flex-col pb-16">
      
      <div className="flex flex-col pt-4">
        {/* titles list */}
        <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4">
          {[1,2,3,4,5,6,7,8,9,10].map((movie) => {
            return <MovieCard key={movie} skelaton={true} />;
          })}
        </div>
      </div>
    </div>
  );
}
