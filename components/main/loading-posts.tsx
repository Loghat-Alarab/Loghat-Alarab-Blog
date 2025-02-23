import { Skeleton } from "@/components/ui/skeleton";

import PostSkeleton from "@/components/main/post-skeleton";

const LoadingPosts = () => {
  return (
    <>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
      <Skeleton className="w-[200px] h-[40px] rounded-full mt-8 mb-4 mx-auto" />
    </>
  );
};
export default LoadingPosts;
