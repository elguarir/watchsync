"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Card } from "./ui/card";
import { getYear } from "date-fns";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { ModifiedTitle } from "@/types/titles";

const TitleCard = ({
  title,
  skelaton,
  single,
}: {
  title?: ModifiedTitle;
  skelaton?: boolean;
  single?: boolean;
}) => {
  if (skelaton) {
    return (
      <div>
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
      </div>
    );
  }
  if (single) {
    return (
      <div className="w-full">
        <Card className="flex ring-2 ring-inset transition-all duration-200 ring-transparent data-[state=checked]:ring-ring data-[state=checked]:ring-2 items-center h-auto gap-4 px-3">
          <div className="h-auto py-2 w-[105px] rounded-md overflow-hidden shadow-sm">
            {title?.poster_path ? (
              <Image
                width={1080}
                height={1920}
                src={title?.poster_path}
                alt={title?.title ?? "Title Poster"}
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <Skeleton className="h-auto w-[105px]" />
            )}
          </div>
          <div className="flex-1 py-3 text-left">
            <div className="pb-1 font-medium">
              <h3 className="line-clamp-2">
                {title?.title}{" "}
                {title?.released && (
                  <span className="text-muted-foreground">
                    ({getYear(new Date(title?.released))})
                  </span>
                )}
              </h3>
            </div>
            <p className="text-sm line-clamp-3">{title?.overview}</p>
            <div className="flex items-center mt-1 space-x-2">
              <Badge className="text-xs" variant={"outline"}>
                {title?.type === "movie" ? "Movie" : "TV Show"}
              </Badge>
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
                  {title?.vote_average?.toFixed(1)}
                </span>
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {title?.genres
                ?.split(",")
                .splice(0, 2)
                .map((genre: string) => (
                  <Button
                    key={genre}
                    asChild
                    size={"sm"}
                    variant={"outline"}
                    className="flex items-center justify-center h-[1.3rem] text-sm"
                  >
                    <span>{genre}</span>
                  </Button>
                ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }
  const id = title?.id;
  return (
    <RadioGroup.Item value={id as unknown as string} className="w-full" asChild>
      <Card className="flex ring-[2.5px] ring-inset transition-all duration-200 ring-transparent data-[state=checked]:ring-ring data-[state=checked]:ring-[2.5px] items-center h-auto gap-4 px-3">
        <div className="h-auto py-2 w-[105px] shadow-sm">
          {title?.poster_path ? (
            <Image
              width={1080}
              height={1920}
              src={title?.poster_path}
              alt={title?.title ?? "Title Poster"}
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <Skeleton className="h-auto w-[105px]" />
          )}
        </div>
        <div className="flex-1 py-3 text-left">
          <div className="pb-1 font-medium">
            <h3 className="line-clamp-2">
              {title?.title}{" "}
              {title?.released && (
                <span className="text-muted-foreground">
                  ({getYear(new Date(title?.released))})
                </span>
              )}
            </h3>
          </div>
          <p className="text-sm line-clamp-3">{title?.overview}</p>
          <div className="flex items-center mt-1 space-x-2">
            <Badge className="text-xs" variant={"outline"}>
              {title?.type === "movie" ? "Movie" : "TV Show"}
            </Badge>
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
                {title?.vote_average?.toFixed(1)}
              </span>
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {title?.genres
              ?.split(",")
              .splice(0, 2)
              .map((genre: string) => (
                <Button
                  key={genre}
                  asChild
                  size={"sm"}
                  variant={"outline"}
                  className="flex items-center justify-center h-[1.3rem] text-sm"
                >
                  <span>{genre}</span>
                </Button>
              ))}
          </div>
        </div>
      </Card>
    </RadioGroup.Item>
  );
};

export default TitleCard;
