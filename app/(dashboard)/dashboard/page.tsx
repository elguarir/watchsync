import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track, Discover, and Rate Your Favorite Movies and TV Shows.",
};

export default function Dashboard() {
  return (
    <div className="flex flex-col">
        <h1 className="text-2xl font-medium tracking-wide font-general">Dashboard</h1>
    </div>
  );
}
