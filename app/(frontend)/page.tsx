import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home — WatchSync",
  description: "Track, Discover, and Rate Your Favorite Movies and TV Shows.",
};

export default function Home() {
  return (
    <main className="container flex flex-col items-center w-full min-h-screen px-4 py-20 lg:p-20">
      <section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10">
        <div className="flex w-full mx-auto max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            className="px-3 py-1 text-xs font-medium w-fit rounded-2xl bg-muted"
            target="_blank"
            href="https://twitter.com/watchsync"
          >
            Follow along on Twitter
          </a>

          <h1 className="text-4xl text-foreground font-serif font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.3rem]">
            Your endless watchlist,{" "}
            <span className="relative whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={249}
                height={22}
                viewBox="0 0 249 22"
                fill="currentColor"
                className="w-full h-[0.6em] fill-orange-500/40 dark:fill-orange-500/70 top-[70%] left-0 absolute"
              >
                <path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
              </svg>
              <span className="relative">organized</span>
            </span>
            .
          </h1>
          <p className="leading-snug text-sm tracking-wide  [text-wrap:balance] text-muted-foreground sm:text-xl">
            WatchSync helps you keep track of every movie and TV show you've
            watched, want to watch, and fell in love with.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="#">Get Started</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="#">Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
