import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddMovieDrawer } from "@/components/AddNewMovieDrawer";
import { Metadata } from "next";
import prisma from "@/lib/db";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import WatchlistTitles from "@/components/WatchlistTitles";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Add movies and TV shows to your watchlist.",
};

export default async function Watchlist() {
  const session = await useAuthSession();
  let user_id = null;
  if (session) {
    user_id = session.user.userId;
  }

  const { watchlist, totalPages, titlesCount } = await getWatchlist(user_id);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-wide font-general">
          Your watchlist
        </h1>
        <AddMovieDrawer />
      </div>
      <div className="flex flex-col gap-3 pt-4 lg:flex-row">
        <Card className="hidden lg:block lg:w-1/4 h-[2.5rem] filters"></Card>
        <Tabs defaultValue="all" className="flex flex-col w-full lg:w-3/4 ">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="watched">Watched</TabsTrigger>
            <TabsTrigger value="favourites">Favourites</TabsTrigger>
          </TabsList>
          {/* <Card className="flex items-center w-full p-2 mt-3 lg:hidden filters">
            <TitlesFilters />
          </Card> */}

          <WatchlistTitles
            initialTitles={watchlist}
            pages={totalPages}
            count={titlesCount}
          />
        </Tabs>
      </div>
    </div>
  );
}

const getWatchlist = async (user_id: string) => {
  const watchlist = await prisma.usertitle.findMany({
    where: { userId: user_id },
    select: {
      isFavourite: true,
      isWatched: true,
      rating: true,
      title: {
        select: {
          id: true,
          title: true,
          type: true,
          released: true,
          vote_average: true,
          genres: true,
          overview: true,
          poster_path: true,
          backdrop_path: true,
        },
      },
    },
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
  });
  const titlesCount = await prisma.usertitle.count({
    where: { userId: user_id },
  });
  let totalPages = Math.ceil(titlesCount / 20);

  return { watchlist, totalPages, titlesCount };
};
