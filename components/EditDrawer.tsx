"use client";
import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import TitleCard from "./TitleCard";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function EditDrawer({
  title,
  isWatched,
  setWatched,
  isFavourite,
  setFavourite,
  rating: ratingProp,
}: {
  title: any;
  isWatched?: boolean;
  setWatched: any;
  isFavourite?: boolean;
  setFavourite: any;
  rating: number | null | undefined;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(ratingProp ?? null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  function handleUpdate() {
    setLoading(true);
    fetch("/api/users/watchlist/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titleId: title?.id,
        isWatched: isWatched,
        isFavourite: isFavourite,
        rating: rating,
      }),
    })
      .then(() => {
        toast.success("Saved!");
        router.refresh();
        setOpen(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          onClick={() => setOpen(true)}
          size={"icon"}
          variant={"outline"}
          className="absolute w-6 h-6 -top-2 -right-2"
        >
          <svg
            version="1.1"
            className="w-4 h-4 transition-transform duration-300"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path d="M0,0h24v24h-24Z" fill="none" fillRule="evenodd" />
            <path
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5.293,15.619l10.326,-10.326c0.39,-0.39 1.023,-0.39 1.413,8.88178e-16l1.676,1.676c0.39,0.39 0.39,1.023 0,1.413l-10.327,10.325c-0.187,0.188 -0.441,0.293 -0.706,0.293h-2.675v-2.675c0,-0.265 0.105,-0.519 0.293,-0.706Z"
            />
            <path
              d="M13.75,7.16l3.09,3.09"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="currentcolor"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="bg-popover flex flex-col rounded-t-[10px] z-50 h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-popover rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/70 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="mb-4 text-2xl font-medium">
                Edit & Save.
              </Drawer.Title>
              <div className="flex flex-col py-4">
                <Drawer.Trigger>
                  <TitleCard title={title} single />
                </Drawer.Trigger>
                <Card className="w-full px-3 py-4 m-4 mx-auto space-y-3">
                  <div className="grid w-full grid-cols-2">
                    <div className="flex items-center space-x-3">
                      <Switch
                        id="watched"
                        checked={isWatched}
                        onCheckedChange={(checked) => setWatched(checked)}
                      />
                      <Label htmlFor="watched">Watched</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        id="favourite"
                        checked={isFavourite}
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
                      onClick={handleUpdate}
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
                        "Save"
                      )}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
