import { Skeleton } from "@/components/ui/skeleton";

const LoadingWorks = () => {
  return (
    <div className="px-4 flex flex-col gap-y-4">
      <Skeleton className="w-full h-7 md:h-9 lg:h-12" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />

      <Skeleton className="w-full h-7 md:h-9 lg:h-12" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />

      <Skeleton className="w-full h-7 md:h-9 lg:h-12" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
      <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
    </div>
  );
};
export default LoadingWorks;
