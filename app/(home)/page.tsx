import { Suspense, use } from "react";

import LatestLoader from "@/app/(home)/latest-loader";
import LatestPosts from "@/components/sections/home/latest-posts";

interface HomeProps {
  searchParams: Promise<{ page: string | undefined }>;
}

export default function Home({ searchParams }: Readonly<HomeProps>) {
  const page = use(searchParams).page;

  return (
    <>
      <Suspense key={page ?? "1"} fallback={<LatestLoader />}>
        <LatestPosts page={page} />
      </Suspense>
    </>
  );
}
