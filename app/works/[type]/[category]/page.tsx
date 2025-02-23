export const experimental_ppr = true;

import { Suspense, use } from "react";

import LoadingPosts from "@/components/main/loading-posts";
import CategoryPosts from "@/components/sections/filter/category-posts";

interface CategoryProps {
  params: Promise<{
    category: string;
    type: string;
  }>;
  searchParams: Promise<{ page: string | undefined }>;
}

export default function Category({
  params,
  searchParams,
}: Readonly<CategoryProps>) {
  const type = use(params).type;
  const category = use(params).category;
  const page = use(searchParams).page;

  return (
    <>
      <Suspense key={page ?? "1"} fallback={<LoadingPosts />}>
        <CategoryPosts type={type} category={category} page={page} />
      </Suspense>
    </>
  );
}
