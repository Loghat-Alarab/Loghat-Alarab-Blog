export const revalidate = 3600;

import type { Metadata } from "next";
import { Almarai } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";
import { ThemeProvider } from "@/providers/theme-provider";

const alamari = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.loghat-alarab.online"),
  title: {
    default: "لغة العرب",
    template: "%s - لغة العرب",
  },
  description: "مقالات و شخصيات كما لم تقرأها من قبل.",
  twitter: {
    card: "summary_large_image",
  },
  keywords: ["لغة العرب", "لغة", "العرب", "مقالات", "شخصيات", "قصص و عبر"],
  alternates: {
    canonical: "/",
  },
  // icons: {
  //   apple: "/apple-touch-icon.png",
  // },
  // openGraph: {
  //   images: [
  //     "/logo.png",
  //     {
  //       url: "https://res.cloudinary.com/dddlfnsoe/image/upload/v1711403718/Asset_1_w4pvpd.png",
  //     },
  //   ],
  // },
  // icons: [
  //   {
  //     url: "/Black_Icon.svg",
  //     href: "/Black_Icon.svg",
  //   },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          alamari.className,
          "min-h-[100dvh] flex flex-col selection:bg-primary"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="container grow">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
