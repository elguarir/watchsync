"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function DeleteDialog({
  titleId,
  closeDrawer,
}: {
  titleId: number;
  closeDrawer: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log(titleId);

  const handleDelete = () => {
    setLoading(true);
    fetch("/api/users/watchlist/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titleId: titleId,
      }),
    })
      .then(() => {
        toast.success("Deleted!", {
          className: "dark:bg-muted dark:text-orange-50",
        });
        router.refresh();
        closeDrawer();
        setOpen(false);
      })
      .catch(() => {
        toast.error("Something went wrong", {
          className: "dark:bg-muted dark:text-orange-50",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-center"
          size={"sm"}
          variant={"outline"}
          disabled={loading}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[95%]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">
            Delete title from watchlist
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this title from your watchlist?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row items-center justify-end gap-2 mt-5">
          <Button
            onClick={() => setOpen(false)}
            size={"sm"}
            variant={"outline"}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            size={"sm"}
            variant={"destructive"}
            className="px-6"
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
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
