import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const name = session.user.name;
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

  return (
    <div className="min-h-screen">
      <DashboardHeader initials={initials} session={session} />
      <main className="flex flex-col flex-1 h-[calc(100vh-64px)] px-5 py-6 md:container">{children}</main>
    </div>
  );
}
