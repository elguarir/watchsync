"use client";

import Link from "next/link";
import { Card } from "./ui/card";
import { getYear } from "date-fns";
import { Badge } from "./ui/badge";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { toast } from "react-hot-toast";
import { EditDrawer } from "./EditDrawer";
import { useRouter } from "next/navigation";

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

const WatchListCard = ({
  title,
  skelaton,
  isFavourite,
  isWatched,
  rating,
}: {
  title?: TitleProp;
  skelaton?: boolean;
  isFavourite?: boolean;
  isWatched?: boolean;
  rating?: number | null;
}) => {
  if (skelaton) {
    return (
      <Card className="flex items-center gap-4 p-3 h-[190px]">
        <Skeleton className="h-[90%] w-[105px] rounded-md overflow-hidden shadow-sm" />
        <div className="flex-1 h-full p-3 space-y-5">
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 pb-1" />
            <Skeleton className="w-2/3 h-2 pb-1" />
          </div>
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-1.5 w-11/12" />
            <Skeleton className="h-1.5" />
            <Skeleton className="h-1.5 w-4/5" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-1/2 h-5" />
          </div>
        </div>
      </Card>
    );
  }

  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [router]);


  const [watched, setWatched] = useState(isWatched ?? false);
  const [favourite, setFavourite] = useState(isFavourite ?? false);

  function handleUpdate(action: "watched" | "favourite") {
    if (action === "watched") {
      fetch("/api/users/watchlist/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleId: title?.id,
          isWatched: !watched,
          isFavourite: favourite,
          rating: rating,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          toast.error("Something went wrong");
        });

      setWatched(!watched);
    } else {
      fetch("/api/users/watchlist/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleId: title?.id,
          isWatched: watched,
          isFavourite: !favourite,
          rating: rating,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          toast.error("Something went wrong");
        });
      setFavourite(!favourite);
    }
  }

  return (
    <div className="relative">
      <Card className="flex items-center gap-4 p-3 h-[200px]">
        <div className="h-auto w-[105px] rounded-md overflow-hidden shadow-sm">
          <Image
            width={1080}
            height={1920}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${title?.poster_path}`}
            alt={title?.title ?? "Movie Poster"}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <div className="pb-1 font-medium">
            <Link
              className="line-clamp-2"
              href={`movies/${title?.id}-${title?.title.toLowerCase()}`}
            >
              {title?.title}
              <span className="text-muted-foreground">
                {" "}
                ({title?.released && getYear(new Date(title?.released))})
              </span>
            </Link>
          </div>
          <p className="text-sm line-clamp-3">{title?.overview}</p>
          <div className="flex items-center mt-1 space-x-2">
            <Badge className="text-xs" variant={"outline"}>
              {title?.type}
            </Badge>
            {rating && (
              <Badge
                className="flex items-center gap-1 text-xs"
                variant={"outline"}
              >
                <svg
                  version="1.1"
                  className="w-[0.8rem] h-[0.8rem]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g fill="none">
                    <path d="M0 0h24v24h-24Z" />
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7.733 20.829l7.5527e-08-3.94238e-08c-.734397.383343-1.64051.0987573-2.02385-.63564 -.153348-.293779-.205092-.630071-.147152-.95636l.809-4.637 -3.406-3.264 -6.34744e-08-6.05322e-08c-.599516-.571727-.622043-1.52121-.0503161-2.12072 .233335-.244676.542489-.403347.877316-.450276l4.729-.676 2.135-4.259 -2.06773e-08 4.17221e-08c.367866-.742271 1.26781-1.04579 2.01008-.677919 .294048.145729.53219.383871.677919.677919l2.135 4.259 4.729.676 1.38777e-07 1.94509e-08c.820408.114988 1.39226.873276 1.27728 1.69368 -.0469292.334828-.2056.643981-.450277.877316l-3.406 3.264 .809 4.638 3.90399e-08 2.19854e-07c.14484.815667-.398973 1.59431-1.21464 1.73915 -.326289.0579399-.662581.0061958-.95636-.147152l-4.267-2.205Z"
                    />
                  </g>
                </svg>
                <span className="mt-px text-[0.75rem]">
                  {rating.toFixed(1)}
                </span>
              </Badge>
            )}
          </div>
          <div className="flex items-center mt-3 space-x-2">
            <Button
              onClick={() => handleUpdate("watched")}
              size={"sm"}
              variant={`${watched ? "success" : "outline"}`}
              className="flex items-center h-6 gap-[2px] text-sm"
            >
              Watched
              <CheckIcon className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleUpdate("favourite")}
              size={"sm"}
              variant={`${favourite ? "red" : "outline"}`}
              className="flex items-center h-6 gap-[2.8px] text-sm"
            >
              Favourite
              <svg
                className="w-[0.90rem] h-[0.90rem]"
                version="1.1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g fill="none">
                  <path d="M0 0h24v24h-24Z" />
                  <path
                    stroke="currentcolor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15.7 4c3.17 0 5.3 2.98 5.3 5.76 0 5.63-8.84 10.24-9 10.24 -.16 0-9-4.61-9-10.24 0-2.78 2.13-5.76 5.3-5.76 1.82 0 3.01.91 3.7 1.71 .69-.8 1.88-1.71 3.7-1.71Z"
                  />
                </g>
              </svg>
            </Button>
          </div>
        </div>
      </Card>
      <EditDrawer isFavourite={favourite} setWatched={setWatched} setFavourite={setFavourite} isWatched={watched} title={title} rating={rating} />
    </div>
  );
};

export default WatchListCard;
