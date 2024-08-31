import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className="w-[80px] h-[20px] rounded-full" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
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

      <div className="container flex flex-col items-center">
        <Skeleton className="w-3/4 h-[40px] rounded-full mt-8 mb-4 mx-auto" />
        <Skeleton className="w-full sm:w-3/4 lg:w-1/2 aspect-video rounded-md mt-8 mb-4 mx-auto" />
        <Skeleton className="w-3/4 h-[40px] rounded-full mt-8 mb-4 mx-auto" />
        <Skeleton className="w-3/4 h-[40px] rounded-full mt-8 mb-4 mx-auto" />
      </div>
    </section>
  );
};
export default Loading;
