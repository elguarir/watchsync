"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

export default function TitlesFilters({}) {
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="px-6">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium tracking-wide font-general">
              Type
            </h3>
            <div className="flex flex-row gap-2">
              <Button
                variant={"outline"}
                size={"xs"}
                className={cn(
                  "px-6 transition-colors duration-300 ease-in-out",
                  type === "movie" &&
                    "bg-primary hover:bg-primary/9 hover:text-white text-white"
                )}
                onClick={() =>
                  setType((value) => (value === "movie" ? "all" : "movie"))
                }
              >
                Movie
              </Button>
              <Button
                variant={"outline"}
                size={"xs"}
                className={cn(
                  "px-6 transition duration-300 ease-in-out",
                  type === "tv" &&
                    "bg-primary hover:bg-primary/9 hover:text-white text-white"
                )}
                onClick={() =>
                  setType((value) => (value === "tv" ? "all" : "tv"))
                }
              >
                TV Show
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium tracking-wide font-general">
              Genre
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {genresList.map((item) => (
                <Button
                  key={item.id}
                  variant={"outline"}
                  size={"xs"}
                  className={cn(
                    "px-6 transition-colors duration-300 ease-in-out",
                    item.name === genre &&
                      "bg-primary hover:bg-primary/9 hover:text-white text-white"
                  )}
                  onClick={() =>
                    setGenre((value) => (value === item.name ? "" : item.name))
                  }
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const genresList = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
];
