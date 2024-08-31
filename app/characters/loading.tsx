import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import PostSkeleton from "@/components/main/post-skeleton";

const Loading = () => {
  return (
    <section>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className="w-[80px] h-[20px] rounded-full" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="w-[80px] h-[20px] rounded-full" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* <h1 className="my-6 sm:my-8 lg:my-12 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        جميع الشخصيات
      </h1> */}
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
    </section>
  );
};
export default Loading;
