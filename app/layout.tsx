import type { Metadata } from "next";
import { Zain } from "next/font/google";

import "./globals.css";
import "@smastrom/react-rating/style.css";

import { ThemeProvider } from "@/providers/theme-provider";

import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";

const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: {
    default: "لغة العرب",
    template: "%s - لغة العرب",
  },
  description:
    "اكتشف عالمًا من القصص الشيقة والمقالات الملهمة والمعرفة العميقة. انغمس في جمال اللغة العربية، واستمتع بروائع الأدب والفكر والثقافة. سواء كنت تبحث عن الإلهام، التعلم، أو الاستمتاع بقراءة ممتعة، فأنت في المكان الصحيح.",
  twitter: {
    card: "summary_large_image",
  },
  keywords: ["لغة العرب", "لغة", "العرب", "مقالات", "شخصيات", "قصص و عبر"],
  alternates: {
    canonical: "/",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={zain.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="container grow flex items-stretch *:basis-full">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
