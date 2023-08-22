"use client";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";
import { url } from "inspector";
import { LoaderIcon, toast } from "react-hot-toast";

export default function Upload({
  setAvatar,
}: {
  setAvatar: (avatar: string) => void;
}) {
  return (
    <UploadButton
      appearance={{
        button({ ready, isUploading }) {
          return cn(
            "inline-flex items-center w-fit border border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-4",
            isUploading && "cursor-not-allowed opacity-50"
          );
        },
        container: "flex-row flex",
        allowedContent: "ml-2 font-medium tracking-wide text-xs text-muted-foreground",
      }}
      content={{
        button({ ready, isUploading, uploadProgress }) {
          if (isUploading) {
            return (
              <>
                <span className="flex items-center gap-2">
                  <LoaderIcon className="mr-1  !w-[14px] !h-[14px] animate-spin" />
                  <span className="text-muted-foreground">Uploading</span>
                </span>
                <span
                  className={cn(
                    "absolute -z-10 transition-[width]  inset-0 bg-primary/70"
                  )}
                  style={{ width: `${uploadProgress}%` }}
                />
              </>
            );
          }

          if (ready) return <>Upload</>;
          return "Getting ready...";
        },
        allowedContent({ ready, isUploading }) {
          if (!ready) return;
          if (isUploading) return "";
          return "Images only, max 4mb";
        },
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        if (res) {
          const url = res[0].url;
          setAvatar(url);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`, {
          className: "dark:bg-muted dark:text-orange-50",
        });
      }}
    />
  );
}
