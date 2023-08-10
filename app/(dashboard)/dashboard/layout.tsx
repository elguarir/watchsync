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
  let [first, last] = session.user.name.split(" ");
  const initials = first.charAt(0) + last.charAt(0);
  return (
    <div className="min-h-screen">
      <DashboardHeader initials={initials} session={session} />
      <main className="px-6 py-10 md:container">{children}</main>
    </div>
  );
}
