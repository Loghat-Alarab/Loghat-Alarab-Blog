import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PostSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="h-full w-full rounded-md" />
          </AspectRatio>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="my-2">
          <Skeleton className="w-[80px] h-[20px] rounded-full" />
        </div>
        <div className="my-2">
          <Skeleton className="w-full h-[20px] rounded-full" />
        </div>
        <div>
          <Skeleton className="w-full h-[20px] rounded-full" />
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <Skeleton className="w-[80px] h-[20px] rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
};
export default PostSkeleton;
