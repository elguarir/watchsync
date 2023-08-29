"use client";
import TitleCard from "./TitleCard";
import { TabsContent } from "./ui/tabs";
import WatchListCard from "./WatchListCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface TitleProp {
  title: string;
  id: number;
  type: string;
  released: Date | null;
  vote_average: number | null;
  genres: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

type Props = {
  initialTitles: {
    title: TitleProp;
    isWatched: boolean;
    isFavourite: boolean;
    rating: number | null;
  }[];
  pages: number;
  count: number;
  skelaton?: boolean;
};

function WatchlistTitles({ initialTitles, pages, count, skelaton }: Props) {
  const [titles, setTitles] = useState(initialTitles);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    setTitles(initialTitles);
  }, [initialTitles]);

  useEffect(() => {
    if (titles.length === count) {
      setLoading(false);
    }
    if (titles.length < count) {
      setLoading(true);
    }
  }, [titles, count]);

  useEffect(() => {
    const loadMoreTitles = async () => {
      if (inView && page <= pages && loading) {
        setPage((prev) => prev + 1);
        setLoading(false);
        const moreTitles = await fetchMore(page);
        setTitles((prev) => [...prev, ...moreTitles]);

        // Once data is fetched, reset loading status if necessary
        if (titles.length < count) {
          setLoading(true);
        }
      }
    };
    setTimeout(() => {
      loadMoreTitles();
    }, 700);
  }, [inView, page, pages]);

  if (skelaton) {
    return (
      <>
        <TabsContent value="all">
          <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3  md:gap-4 data-[state=inactive]:hidden transition">
            {[...Array(9)].map((_, idx) => (
              <TitleCard key={idx} skelaton />
            ))}
          </div>
          <div
            ref={ref}
            className="flex h-[2.8rem] mb-6 items-center justify-center w-full gap-2 py-4"
          >
            {loading && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="loading more titles"
                  className="w-6 h-6 animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span className="sr-only">Loading more...</span>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="watched">
          <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3  md:gap-4 data-[state=inactive]:hidden transition">
            {[...Array(9)].map((_, idx) => (
              <TitleCard key={idx} skelaton />
            ))}
          </div>

          <div
            ref={ref}
            className="flex h-[2.8rem] mb-6 items-center justify-center w-full gap-2 py-4"
          >
            {loading && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="loading more titles"
                  className="w-6 h-6 animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span className="sr-only">Loading more...</span>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="favourites">
          <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3  md:gap-4 data-[state=inactive]:hidden transition">
            {[...Array(9)].map((_, idx) => (
              <TitleCard key={idx} skelaton />
            ))}
          </div>

          <div
            ref={ref}
            className="flex h-[2.8rem] mb-6 items-center justify-center w-full gap-2 py-4"
          >
            {loading && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="loading more titles"
                  className="w-6 h-6 animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span className="sr-only">Loading more...</span>
              </>
            )}
          </div>
        </TabsContent>
      </>
    );
  }

  return (
    <>
      <TabsContent value="all">
        <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3  md:gap-4 data-[state=inactive]:hidden transition">
          {titles.map((title) => (
            <WatchListCard
              key={title.title.id}
              title={title.title}
              isWatched={title.isWatched}
              isFavourite={title.isFavourite}
              rating={title.rating}
            />
          ))}
        </div>

        <div
          ref={ref}
          className="flex h-[2.8rem] mb-6 items-center justify-center w-full gap-2 py-4"
        >
          {loading && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="loading more titles"
                className="w-6 h-6 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="sr-only">Loading more...</span>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="watched">
        <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3  md:gap-4 data-[state=inactive]:hidden transition">
          {titles
            .filter((title) => title.isWatched)
            .map((title) => (
              <WatchListCard
                key={title.title.id}
                title={title.title}
                isWatched={title.isWatched}
                isFavourite={title.isFavourite}
                rating={title.rating}
              />
            ))}
        </div>

        <div
          ref={ref}
          className="flex h-[2.8rem] mb-6 items-center justify-center w-full gap-2 py-4"
        >
          {loading && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="loading more titles"
                className="w-6 h-6 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="sr-only">Loading more...</span>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="favourites">
        <div className="pt-4 max-md:flex max-md:flex-col max-md:space-y-3 md:grid md:grid-cols-2 xl:grid-cols-3  md:gap-4 data-[state=inactive]:hidden transition">
          {titles
            .filter((title) => title.isFavourite)
            .map((title) => (
              <WatchListCard
                key={title.title.id}
                title={title.title}
                isWatched={title.isWatched}
                isFavourite={title.isFavourite}
                rating={title.rating}
              />
            ))}
        </div>

        <div
          ref={ref}
          className="flex h-[2.8rem] mb-6 items-center justify-center w-full gap-2 py-4"
        >
          {loading && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="loading more titles"
                className="w-6 h-6 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="sr-only">Loading more...</span>
            </>
          )}
        </div>
      </TabsContent>
    </>
  );
}

export default WatchlistTitles;

const fetchMore = async (page: number) => {
  const res = await fetch(`/api/users/watchlist?page=${page}`);
  const data = await res.json();
  return data;
};
