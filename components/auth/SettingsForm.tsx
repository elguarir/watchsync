"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Upload from "../UploadButton";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { LoaderIcon, toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsForm({
  session,
  initials,
}: {
  session: Session | null;
  initials: string;
}) {
  const [name, setName] = useState(session?.user.name ?? "");
  const [avatar, setAvatar] = useState(session?.user.image ?? "");
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (avatar !== session?.user.image && avatar !== "") {
      setRemoveAvatar(true);
    }
    console.log("Avatar: ", avatar);
    console.log("Original: ", session?.user.image);
  }, [avatar, session?.user.image]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar,
        password,
        rePassword,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        className: "dark:bg-muted dark:text-orange-50",
      });
      update({ name: data.user.name, image: data.user.image });
      router.refresh();
      router.push("/dashboard/settings");
    } else {
      toast.error(data.message, {
        className: "dark:bg-muted dark:text-orange-50",
      });
    }
    setLoading(false);
  };
  return (
    <form className="mt-6 space-y-3" onSubmit={handleUpdate}>
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input
          placeholder="Your display name."
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar</Label>
        <div className="flex flex-row items-center w-full space-x-3">
          <Avatar className="w-11 h-11">
            <AvatarImage src={avatar} className="object-cover cursor-pointer" />
            <AvatarFallback className="cursor-pointer">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Upload setAvatar={setAvatar} />
          {removeAvatar && (
            <div className="flex justify-end flex-1">
              <button
                type="button"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "w-6 h-6 p-1"
                )}
                onClick={() => {
                  setAvatar(session?.user.image);
                  setRemoveAvatar(false);
                }}
              >
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Separator className="my-8 " />
        <h3 className="mb-3 text-lg font-medium">Update Password</h3>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="******"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="re_password">Confirm password</Label>
          <Input
            placeholder="******"
            type="password"
            name="re_password"
            id="re_password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end w-full !mt-6">
        <Button size={"sm"}>
          {!loading ? (
            "Update Details"
          ) : (
            <>
              <LoaderIcon className="mr-2 !w-[13px] !h-[13px] border-r-muted-foreground animate-spin" />
              Updating...
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
