import { SiteHeader } from "@/components/site-header";
import { authOptions } from "@/lib/auth";
import SessionProviderWrapper from "@/providers/SessionProvider";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </div>
    </SessionProviderWrapper>
  );
}
