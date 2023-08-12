import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MovieDetails } from "@/types/movies";
import { getYear } from "date-fns";
import Image from "next/image";
import Link from "next/link";
export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const tmdb_id = id.split("-")[0];

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdb_id}?language=en-US&api_key=18bbc44d1e9834345fa7cd8f22c77cee&page=1`
  );

  const movie: MovieDetails = await res.json();

  return (
    <div className="flex flex-col pb-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-wide font-general">
          {movie.title}
        </h1>
      </div>
      <div className="flex flex-col pt-4">
        <Card className="flex items-center gap-4 p-3 h-fit">
          <div className="h-auto w-[105px] rounded-md overflow-hidden shadow-sm">
            <Image
              width={1080}
              height={1920}
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`}
              alt={movie?.title ?? "Movie Poster"}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 h-full py-3">
            <div className="pb-1 font-medium">
              <Link
                className="line-clamp-2"
                href={`movies/${movie?.id}-${movie?.title.toLowerCase()}`}
              >
                {movie?.title}
                <span className="text-muted-foreground">
                  {" "}
                  (
                  {movie?.release_date &&
                    getYear(new Date(movie?.release_date))}
                  )
                </span>
              </Link>
            </div>
            <p className="text-sm">{movie?.overview}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {movie.genres.map((genre) => (
                <Badge className="text-xs" variant={"outline"}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
        <div className="flex flex-col w-full mt-6 aspect-video">
          <span className="font-[550] text-lg text-center">Watch {movie.title} </span>
          <iframe
            className="w-full h-full"
            src={`https://vidsrc.to/embed/movie/${movie.imdb_id}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
