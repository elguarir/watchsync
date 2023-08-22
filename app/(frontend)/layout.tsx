import { SiteHeader } from "@/components/site-header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </div>
    
  );
}
