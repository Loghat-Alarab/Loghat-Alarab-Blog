import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LIMIT } from "@/constants";

import { getPostsByType } from "@/lib/data/posts";

import PostCard from "@/components/main/post-card";

interface TypePostsProps {
  type: string;
  page: string | undefined;
}

const TypePosts = async ({ type, page }: TypePostsProps) => {
  const posts = await getPostsByType(type, Number(page));

  const getCanNext = posts.length === LIMIT;
  const getCanPrevious = Number(page) > 1;

  return (
    <>
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
                href={`/works/${type}${
                  Number(page) === 2 ? "" : `?page=${Number(page) - 1}`
                }`}
              />
            </PaginationItem>
          )}
          {getCanPrevious && (
            <PaginationItem>
              <PaginationLink
                href={`/works/${type}${
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
              <PaginationLink
                href={`/works/${type}?page=${Number(page ?? 1) + 1}`}
              >
                {Number(page ?? 1) + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {getCanNext && (
            <PaginationItem>
              <PaginationNext
                href={`/works/${type}?page=${Number(page ?? 1) + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
export default TypePosts;
