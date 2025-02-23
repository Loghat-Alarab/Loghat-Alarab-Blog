import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

import LoadingPosts from "@/components/main/loading-posts";

const LoadingTypes = () => {
  return (
    <>
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
      <LoadingPosts />
    </>
  );
};
export default LoadingTypes;
