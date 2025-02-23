export const experimental_ppr = true;

import type { Metadata } from "next";
import { Suspense, use } from "react";
import { redirect } from "next/navigation";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import SearchPosts from "@/components/sections/search/search-posts";
import LoadingPosts from "@/components/main/loading-posts";

interface SearchProps {
  searchParams: Promise<{ query: string; page: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchProps): Promise<Metadata> {
  const query = (await searchParams).query;

  return {
    title: `نتائج البحث عن ${query}`,
  };
}

const Search = ({ searchParams }: SearchProps) => {
  const page = use(searchParams).page;
  const query = use(searchParams).query;

  if (!query) redirect("/");

  return (
    <section className="pt-14 md:pt-20 px-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{query}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Suspense key={page ?? "1"} fallback={<LoadingPosts />}>
        <SearchPosts query={query} page={page} />
      </Suspense>
    </section>
  );
};
export default Search;
