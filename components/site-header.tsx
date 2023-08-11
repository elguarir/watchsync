import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import MobileNav from "./MobileNav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./theme-toggler";

export async function SiteHeader() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center justify-between h-16 px-4 space-x-4 md:container">
        <MainNav />
        <div className="items-center justify-end flex-1 hidden space-x-4 md:flex">
          <nav className="flex items-center space-x-2">
            {!session ? (
              <>
                <ModeToggle className="w-10 h-10" />
                <Separator orientation="vertical" className="h-5" />
                <Link href="/login">
                  <div
                    className={buttonVariants({
                      size: "default",
                      variant: "outline",
                    })}
                  >
                    Login
                  </div>
                </Link>
                <Link href="/signup">
                  <div
                    className={buttonVariants({
                      size: "default",
                      variant: "default",
                    })}
                  >
                    Sign Up
                  </div>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <div
                  className={buttonVariants({
                    size: "default",
                    variant: "default",
                  })}
                >
                  Dashboard
                </div>
              </Link>
            )}
          </nav>
        </div>
        <MobileNav session={session} />
      </div>
    </header>
  );
}
