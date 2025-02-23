export const experimental_ppr = true;

import { Suspense } from "react";

import SpecialLoader from "./special-loader";
import MainCarousal from "@/components/sections/home/main-carousal";
import SpecialPosts from "@/components/sections/home/special-posts";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <div>
      <MainCarousal />

      <Suspense fallback={<SpecialLoader />}>
        <SpecialPosts />
      </Suspense>

      {children}
    </div>
  );
}
