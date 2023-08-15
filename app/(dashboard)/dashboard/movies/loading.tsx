import React from "react";
import MovieCard from "@/components/WatchListCard";
import WatchListCard from "@/components/WatchListCard";
export default function Loading() {
  return (
    <div className="flex flex-col pb-16">
      <div className="flex flex-col pt-4">
        <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((movie) => {
            return <WatchListCard key={movie} skelaton={true} />;
          })}
        </div>
      </div>
    </div>
  );
}
