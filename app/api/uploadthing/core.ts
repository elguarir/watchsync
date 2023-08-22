import { createUploadthing, type FileRouter } from "uploadthing/next";
import { useAuthSession } from "@/lib/hooks/useAuthSession";

const f = createUploadthing();

export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await useAuthSession();
      if (!session) throw new Error("Unauthorized");

      return { userId: session?.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
