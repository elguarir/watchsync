import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

const bespoke = localFont({
  src: [
    {
      path: "./fonts/Bespoke/BespokeSerif-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Bespoke/BespokeSerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

// const clash = localFont({
//   src: [
//     {
//       path: "./fonts/ClashDisplay/ClashDisplay-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ClashDisplay/ClashDisplay-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ClashDisplay/ClashDisplay-SemiBold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ClashDisplay/ClashDisplay-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-clash",
// });

// const generalsans = localFont({
//   src: [
//     {
//       path: "./fonts/GeneralSans/GeneralSans-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans/GeneralSans-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans/GeneralSans-SemiBold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//   ],
//   variable: "--font-general",
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          bespoke.variable,
          // clash.variable,
          inter.className,
          // generalsans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
