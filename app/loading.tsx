import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PostSkeleton from "@/components/main/post-skeleton";

const Loading = () => {
  return (
    <div>
      <p className="mb-6">المميز</p>
      <div className="flex flex-col sm:flex-row mb-10 bg-card p-6 rounded-lg lg:w-3/4 mx-auto">
        <div className="sm:w-1/2">
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="h-full w-full rounded-md" />
          </AspectRatio>
        </div>
        <div className="sm:w-1/2 flex flex-col justify-evenly py-2 sm:p-8 gap-2">
          <div className="my-2">
            <Skeleton className="w-[80px] h-[20px] rounded-full" />
          </div>
          <div className="font-bold sm:text-xl lg:text-2xl">
            <Skeleton className="w-full h-[20px] rounded-full" />
          </div>
          <div className="font-bold sm:text-xl lg:text-2xl my-2">
            <Skeleton className="w-full h-[20px] rounded-full" />
          </div>
          <div>
            <Skeleton className="w-[80px] h-[20px] rounded-full" />
          </div>
        </div>
      </div>

      <h2>أحدث المقالات</h2>
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
    </div>
  );
};
export default Loading;
