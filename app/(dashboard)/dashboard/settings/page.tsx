import SettingsForm from "@/components/auth/SettingsForm";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import { Session } from "next-auth";
import React from "react";

export default async function Settings() {
  const session = await useAuthSession();
  const initials = getInitials(session);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-medium tracking-wide font-general">
        Settings
      </h1>
      <span className="mt-1 text-sm font-medium text-muted-foreground">
        View and update your account details.
      </span>
      <SettingsForm session={session} initials={initials} />
    </div>
  );
}

function getInitials(session: Session | null) {
  const name = session?.user.name;
  let initials = "";
  // gettings the initials of the user
  if (name.split(/\s+/).length === 1) {
    initials = name.slice(0, 2).toUpperCase();
  } else {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
    let matches = [...name.matchAll(rgx)] || [];
    initials = (
      (matches.shift()?.[1] || "") + (matches.pop()?.[1] || "")
    ).toUpperCase();
  }
  return initials;
}
