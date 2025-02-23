export const experimental_ppr = true;

import { Suspense, use } from "react";

import LoadingPosts from "@/components/main/loading-posts";
import TypePosts from "@/components/sections/filter/type-posts";

interface TypeProps {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{ page: string | undefined }>;
}

export default function Type({ params, searchParams }: Readonly<TypeProps>) {
  const type = use(params).type;
  const page = use(searchParams).page;

  return (
    <>
      <Suspense key={page ?? "1"} fallback={<LoadingPosts />}>
        <TypePosts type={type} page={page} />
      </Suspense>
    </>
  );
}
