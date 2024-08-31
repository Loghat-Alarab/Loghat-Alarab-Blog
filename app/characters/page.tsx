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
import { getPostsByType } from "@/lib/actions";
import PostCard from "@/components/main/post-card";

export const metadata: Metadata = {
  title: "شخصيات",
  alternates: {
    canonical: "/characters",
  },
};

const Characters = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const characters = await getPostsByType(
    "characters",
    Number(searchParams.page)
  );

  const getCanNext = characters.length === LIMIT;
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
              <BreadcrumbPage> جميع الشخصيات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* <h1 className="my-6 sm:my-8 lg:my-12 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        جميع الشخصيات
      </h1> */}
      {characters.length > 0 ? (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {characters.map((blog) => (
            <PostCard key={blog.fields.slug} post={blog} />
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
                href={`/characters${
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
                href={`/characters${
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
                href={`/characters?page=${Number(searchParams.page ?? 1) + 1}`}
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
                href={`/characters?page=${Number(searchParams.page ?? 1) + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
};
export default Characters;
