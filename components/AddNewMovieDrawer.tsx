"use client";
import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import type { ModifiedTitle } from "@/types/titles";
import TitleCard from "./TitleCard";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function AddMovieDrawer() {
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<ModifiedTitle | null>(
    null
  );
  const [watched, setWatched] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [titles, setTitles] = useState<ModifiedTitle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<String>("");
  const [rating, setRating] = useState<number | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      setNotFound(false);
      const data = await fetch("/api/titles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const results = await data.json();
      setTitles(results.results);
      if (results.results.length === 0) setNotFound(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleTitleChange({ value }: { value: string }) {
    const title = titles.find((title) => title.id === parseInt(value));
    setSelectedTitle(title ?? null);
  }

  async function handleAddToWatchlist() {
    setLoading(true);
    try {
      const res = await fetch("/api/users/watchlist/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          titleId: selectedTitle?.id,
          type: selectedTitle?.type,
          isWatched: watched,
          isFavourite: favourite,
          rating,
        }),
      });
      const data = await res.json();
      toast.success("Added to watchlist!", {
        style: {
          minWidth: "250px",
        },
        className: "dark:bg-muted dark:text-orange-50",
        position: "bottom-center",
      });
      router.refresh();
      router.push("/dashboard/watchlist");
    } catch (error) {
      toast.error("Something went wrong", {
        className: "dark:bg-muted dark:text-orange-50",
      });
    }
    setLoading(false);
  }
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button size={"sm"} className="flex items-center">
          <PlusIcon className="mr-2" />
          Add
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="bg-popover flex flex-col rounded-t-[10px] z-50 h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-popover rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/70 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="mb-4 text-2xl font-medium">
                Go ahead, add a something!
              </Drawer.Title>
              <Drawer.NestedRoot>
                {selectedTitle ? (
                  <div className="flex flex-col py-4">
                    <Drawer.Trigger>
                      <TitleCard title={selectedTitle} single />
                    </Drawer.Trigger>
                    <Card className="w-full px-3 py-4 m-4 mx-auto space-y-3">
                      <div className="grid w-full grid-cols-2">
                        <div className="flex items-center space-x-3">
                          <Switch
                            id="watched"
                            checked={watched}
                            onCheckedChange={(checked) => setWatched(checked)}
                          />
                          <Label htmlFor="watched">Watched</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Switch
                            id="favourite"
                            checked={favourite}
                            onCheckedChange={(checked) => setFavourite(checked)}
                          />
                          <Label htmlFor="favourite">Favourite</Label>
                        </div>
                      </div>
                      <div className="grid w-full grid-cols-2 pt-3">
                        <div className="flex items-center space-x-3">
                          <Label htmlFor="rating">Rating</Label>
                          <Input
                            id="rating"
                            type="number"
                            value={rating !== null ? rating.toString() : ""}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              setRating(isNaN(value) ? null : value);
                            }}
                            name="rating"
                            min={1}
                            max={10}
                            className="w-16 h-8"
                            placeholder="7.5"
                          />
                        </div>
                        <Button
                          className="text-center min-w-[132.875px] w-fit"
                          size={"sm"}
                          onClick={handleAddToWatchlist}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 mr-2 animate-spin"
                              >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                              Saving...
                            </>
                          ) : (
                            "Add to watchlist"
                          )}
                        </Button>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <>
                    <Drawer.Trigger className="h-[150px] flex items-center flex-col  space-y-2 justify-center border-dotted border-[3px] text-xl py-2 rounded-md overflow-hidden shadow-sm w-full my-2">
                      <p className="text-muted-foreground">
                        Search and select a title to add.
                      </p>
                      <PlusIcon className="w-8 h-8 text-muted-foreground" />
                    </Drawer.Trigger>
                  </>
                )}

                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40" />
                  <Drawer.Content className="bg-popover z-[60] flex flex-col rounded-t-[10px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-popover rounded-t-[10px] flex-1">
                      <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/70 mb-8" />
                      <div className="max-w-md mx-auto">
                        <Drawer.Title className="mb-4 text-2xl font-medium">
                          Search and select a title to add.
                        </Drawer.Title>
                        <form
                          className="w-full px-2 mt-2"
                          onSubmit={handleSubmit}
                        >
                          <div className="flex items-center gap-2">
                            <Input
                              value={query as string}
                              onChange={(e) => setQuery(e.target.value)}
                              required
                              name="query"
                              id="query"
                              placeholder="The Batman 2022"
                              type="text"
                            />
                            <Button
                              className="w-14"
                              size={"icon"}
                              variant={"secondary"}
                              type="submit"
                            >
                              {loading ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-5 h-5 animate-spin"
                                >
                                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-5 h-5"
                                >
                                  <circle cx="11" cy="11" r="8" />
                                  <path d="m21 21-4.3-4.3" />
                                </svg>
                              )}
                            </Button>
                          </div>
                        </form>
                      </div>
                      <ScrollArea className="flex w-full max-w-md mx-auto flex-col h-[724px] pb-8 px-2 pr-3 my-4">
                        <ScrollBar />
                        <form className="w-full">
                          {!loading && titles.length >= 1 ? (
                            <RadioGroup.Root
                              className="flex flex-col pb-8 space-y-3"
                              value={selectedTitleId as unknown as string}
                              onValueChange={(value) => {
                                setSelectedTitleId(value);
                                handleTitleChange({ value });
                              }}
                            >
                              <>
                                {titles.map((title: ModifiedTitle) => {
                                  if (title.poster_path) {
                                    return (
                                      <>
                                        <TitleCard
                                          title={title}
                                          key={title.id}
                                        />
                                      </>
                                    );
                                  }
                                })}
                              </>
                            </RadioGroup.Root>
                          ) : loading ? (
                            <>
                              <div className="flex flex-col w-full space-y-3">
                                {[...Array(9)].map((_, idx) => (
                                  <TitleCard key={idx} skelaton />
                                ))}
                              </div>
                            </>
                          ) : notFound ? (
                            <div className="flex justify-center py-8">
                              <p className="text-muted-foreground">
                                No results found.
                              </p>
                            </div>
                          ) : (
                            <div className="flex justify-center py-8">
                              <p className="text-muted-foreground">
                                Search results will appear here.
                              </p>
                            </div>
                          )}
                        </form>
                      </ScrollArea>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.NestedRoot>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
