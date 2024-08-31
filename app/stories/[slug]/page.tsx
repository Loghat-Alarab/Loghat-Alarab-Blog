export const revalidate = 3600;

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
import { getCategory, getPostsByCategory } from "@/lib/actions";
import PostCard from "@/components/main/post-card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // fetch data
  const category = await getCategory(params.slug);

  return {
    title: category?.fields.name,
  };
}

const BlogCategory = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page: string };
}) => {
  const [category, stories] = await Promise.all([
    getCategory(params.slug),
    getPostsByCategory(params.slug, Number(searchParams.page)),
  ]);

  const getCanNext = stories.length === LIMIT;
  const getCanPrevious = Number(searchParams.page) > 1;

  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category?.fields.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {stories.length > 0 ? (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {stories.map((story) => (
            <PostCard key={story.fields.slug} post={story} />
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
                href={`/stories/${params.slug}${
                  Number(searchParams.page) === 2
                    ? ""
                    : `?page=${Number(searchParams.page) - 1}`
                }`}
              />
            </PaginationItem>
          )}
          {getCanPrevious && (
            <PaginationItem>
              <PaginationLink
                href={`/stories/${params.slug}${
                  Number(searchParams.page) === 2
                    ? ""
                    : `?page=${Number(searchParams.page) - 1}`
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
                href={`/stories/${params.slug}?page=${
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
                href={`/stories/${params.slug}?page=${
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
export default BlogCategory;
