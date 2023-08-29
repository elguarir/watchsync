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
        {titlesCount === 0 ? (
          <div className="flex flex-col py-16 items-center justify-center flex-1 text-center [text-wrap:balance]">
            <h2 className="text-xl font-medium font-general">
              Your watchlist is empty
            </h2>
            <p className="text-muted-foreground">
              Add movies and TV shows to your watchlist to keep track of what
              you want to watch.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="flex flex-col w-full ">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="watched">Watched</TabsTrigger>
              <TabsTrigger value="favourites">Favourites</TabsTrigger>
            </TabsList>

            <WatchlistTitles
              initialTitles={watchlist}
              pages={totalPages}
              count={titlesCount}
            />
          </Tabs>
        )}
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
