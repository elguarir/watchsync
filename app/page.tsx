import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — TrackFlix",
  description: "Track, Discover, and Rate Your Favorite Movies and TV Shows.",
};

export default function Home() {
  return (
    <main className="container flex flex-col items-center w-full min-h-screen px-4 py-20 lg:p-20">
      <section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="flex w-full mx-auto max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
            href="https://twitter.com/trackflix"
          >
            Follow along on Twitter
          </a>

          <h1 className="text-3xl font-medium [text-wrap:balance] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.3rem]">
            Track, Discover, and Rate Your Favorite Movies and TV Shows.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl">
            Track and organize all the movies and TV shows you love with
            TrackFlix.
          </p>
          <div className="space-x-4">
            <a
              className="inline-flex items-center justify-center px-8 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11"
              href="/login"
            >
              Get Started
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 text-sm font-medium transition-colors border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border-input hover:bg-accent hover:text-accent-foreground h-11"
              href="https://github.com/shadcn/taxonomy"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
