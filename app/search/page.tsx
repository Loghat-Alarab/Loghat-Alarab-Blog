export const revalidate = 0;

import Link from "next/link";
import type { Metadata } from "next";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LIMIT } from "@/lib/constants";
import { getPostsByQuery } from "@/lib/actions";
import PostCard from "@/components/main/post-card";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { query: string };
}): Promise<Metadata> {
  // fetch data

  return {
    title: `نتائج البحث عن ${searchParams.query}`,
  };
}

const Search = async ({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) => {
  const posts = await getPostsByQuery(
    searchParams.query,
    Number(searchParams.page)
  );
  const params = new URLSearchParams({
    query: searchParams.query,
  });

  const getCanNext = posts.length === LIMIT;
  const getCanPrevious = Number(searchParams.page) > 1;

  return (
    <section>
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
              <BreadcrumbPage>{searchParams.query}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {posts.map((post) => (
            <PostCard key={post.fields.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center my-20 text-lg">لا يوجد بيانات لعرضها</div>
      )}
      <Pagination className="mt-8 mb-4">
        <PaginationContent>
          {getCanPrevious && (
            <PaginationItem>
              <PaginationPrevious
                href={`/search${
                  Number(searchParams.page) === 2
                    ? `?${params.toString()}`
                    : `?${params.toString()}&page=${
                        Number(searchParams.page) - 1
                      }`
                }`}
              />
            </PaginationItem>
          )}
          {getCanPrevious && (
            <PaginationItem>
              <PaginationLink
                href={`/search${
                  Number(searchParams.page) === 2
                    ? `?${params.toString()}`
                    : `?${params.toString()}&page=${
                        Number(searchParams.page) - 1
                      }`
                }`}
              >
                {Number(searchParams.page) - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {searchParams.page ?? 1}
            </PaginationLink>
          </PaginationItem>
          {getCanNext && (
            <PaginationItem>
              <PaginationLink
                href={`/search?${params.toString()}&page=${
                  Number(searchParams.page ?? 1) + 1
                }`}
              >
                {Number(searchParams.page ?? 1) + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          {getCanNext && (
            <PaginationItem>
              <PaginationNext
                href={`/search?${params.toString()}&page=${
                  Number(searchParams.page ?? 1) + 1
                }`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
};
export default Search;
