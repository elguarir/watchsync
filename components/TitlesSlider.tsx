"use client";

import React from "react";
import { Badge } from "./ui/badge";
import SaveButton from "./SaveTitleButton";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Card } from "./ui/card";
import { getYear } from "date-fns";
import { Title, TitleResults } from "@/types/titles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

export default function TitlesSlider({
  titles,
  type,
  skeleton,
}: {
  titles?: TitleResults;
  type: string;
  skeleton?: boolean;
}) {
  if (skeleton) {
    return (
      <Swiper
        pagination={true}
        spaceBetween={20}
        modules={[Pagination]}
        className="py-3 mySwiper"
      >
        {Array.from(Array(10).keys()).map((i) => (
          <SwiperSlide className="pb-0.5 my-1.5">
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
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={20}
        modules={[Pagination]}
        className="py-3 mySwiper"
      >
        {titles?.results.slice(0, 10).map((title: Title) => (
          <SwiperSlide className="pb-0.5 my-1.5">
            <Card className="flex items-center h-[210px] gap-4 px-3">
              <div className="h-auto py-2 w-[115px] ">
                {title?.poster_path ? (
                  <Image
                    width={1080}
                    height={1920}
                    src={`https://image.tmdb.org/t/p/w500${title?.poster_path}`}
                    alt={title?.title ?? "Title Poster"}
                    className="object-cover w-full h-full rounded-md shadow-sm"
                  />
                ) : (
                  <Skeleton className="h-full w-[115px]" />
                )}
              </div>
              <div className="flex-1 py-3 text-left">
                <div className="pb-1 font-medium">
                  <h3 className="line-clamp-2">
                    {type === "movie" ? title?.title : title?.name}{" "}
                    {type === "movie" ? (
                      <span className="text-muted-foreground">
                        ({getYear(new Date(title?.release_date))})
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {/* @ts-ignore */}(
                        {getYear(new Date(title?.first_air_date))})
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-sm line-clamp-3">{title?.overview}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <Badge className="text-xs" variant={"outline"}>
                    {/* Movie */}
                    {type === "movie" ? "Movie" : "TV Show"}
                  </Badge>
                </div>
                <div className="flex items-center justify-end w-full mt-3">
                  <SaveButton titleId={title?.id} type={"movie"} />
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
