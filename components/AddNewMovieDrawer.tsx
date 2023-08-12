"use client";

import { Drawer } from "vaul";
import { Button } from "./ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddMovieDrawer() {
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
                Go ahead, add a movie!
              </Drawer.Title>

              <form className="grid space-y-2">
                <div className="flex flex-col space-y-1">
                  <Label className="text-[1.1rem]" htmlFor="title">
                    Title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="The Batman (2022)"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="animation">Animation</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="crime">Crime</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="drama">Drama</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </form>
            </div>
          </div>
          {/* <div className="p-4 mt-auto border-t bg-zinc-100 border-zinc-200">text-muted-foreground
            <div className="flex justify-end max-w-md gap-6 mx-auto">
              <a
                className="text-xs text-zinc-600 flex items-center gap-0.25"
                href="https://github.com/emilkowalski/vaul"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
              <a
                className="text-xs text-zinc-600 flex items-center gap-0.25"
                href="https://twitter.com/emilkowalski_"
                target="_blank"
              >
                Twitter
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div> */}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
