import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LIMIT } from "@/constants";
import { getPostsByQuery } from "@/lib/data/posts";

import PostCard from "@/components/main/post-card";
import { wait } from "@/lib/utils";

interface SearchPostsProps {
  query: string;
  page: string | undefined;
}

const SearchPosts = async ({ query, page }: SearchPostsProps) => {
  const posts = await getPostsByQuery(query, Number(page));
  const params = new URLSearchParams({
    query: query,
  });

  const getCanNext = posts.length === LIMIT;
  const getCanPrevious = Number(page) > 1;

  await wait(2000);

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
                href={`/search${
                  Number(page) === 2
                    ? `?${params.toString()}`
                    : `?${params.toString()}&page=${Number(page) - 1}`
                }`}
              />
            </PaginationItem>
          )}
          {getCanPrevious && (
            <PaginationItem>
              <PaginationLink
                href={`/search${
                  Number(page) === 2
                    ? `?${params.toString()}`
                    : `?${params.toString()}&page=${Number(page) - 1}`
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
                href={`/search?${params.toString()}&page=${
                  Number(page ?? 1) + 1
                }`}
              >
                {Number(page ?? 1) + 1}
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
                  Number(page ?? 1) + 1
                }`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
export default SearchPosts;
