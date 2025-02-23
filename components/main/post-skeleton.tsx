import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PostSkeleton = () => {
  return (
    <Card>
      <CardHeader className="p-0">
        <CardTitle>
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="h-full w-full rounded-md" />
          </AspectRatio>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="my-2">
          <Skeleton className="w-full h-[20px] rounded-full" />
        </div>
        <div className="my-2">
          <Skeleton className="w-[80px] h-[20px] rounded-full" />
        </div>
        <div>
          <Skeleton className="w-full h-[20px] rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};
export default PostSkeleton;
