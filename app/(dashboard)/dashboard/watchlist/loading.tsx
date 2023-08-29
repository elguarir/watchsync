import { AddMovieDrawer } from "@/components/AddNewMovieDrawer";
import WatchlistTitles from "@/components/WatchlistTitles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function WatchlistLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-wide font-general">
          Your watchlist
        </h1>
        <AddMovieDrawer />
      </div>
      <div className="flex flex-col gap-3 pt-4 lg:flex-row">
        <Tabs defaultValue="all" className="flex flex-col w-full ">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="watched">Watched</TabsTrigger>
            <TabsTrigger value="favourites">Favourites</TabsTrigger>
          </TabsList>

          <WatchlistTitles initialTitles={[]} pages={0} count={0} skelaton />
        </Tabs>
      </div>
    </div>
  );
}
