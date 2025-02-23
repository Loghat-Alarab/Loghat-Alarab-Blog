import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LIMIT } from "@/constants";
import { getLatestPosts } from "@/lib/data/posts";

import PostCard from "@/components/main/post-card";

interface LatestPostsProps {
  page: string | undefined;
}

const LatestPosts = async ({ page }: LatestPostsProps) => {
  const posts = await getLatestPosts(Number(page));

  const getCanNext = posts.length === LIMIT;
  const getCanPrevious = Number(page) > 1;

  return (
    <section className="my-10 sm:my-16 px-4">
      <h2 className="text-4xl font-bold text-primary">أحدث الأعمال</h2>
      {posts.length > 0 ? (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {posts.map((blog) => (
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
                href={`/${
                  Number(page) === 2 ? "" : `?page=${Number(page) - 1}`
                }`}
              />
            </PaginationItem>
          )}
          {getCanPrevious && (
            <PaginationItem>
              <PaginationLink
                href={`/${
                  Number(page) === 2 ? "" : `?page=${Number(page) - 1}`
                }`}
              >
                {Number(page) - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page ?? 1}
            </PaginationLink>
          </PaginationItem>
          {getCanNext && (
            <PaginationItem>
              <PaginationLink href={`/?page=${Number(page ?? 1) + 1}`}>
                {Number(page ?? 1) + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          {getCanNext && (
            <PaginationItem>
              <PaginationNext href={`/?page=${Number(page ?? 1) + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
};
export default LatestPosts;
