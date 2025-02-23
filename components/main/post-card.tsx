import { Suspense } from "react";
import { format } from "date-fns";
import { Entry } from "contentful";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IAsset, ICategory, IType, PostEntrySkeleton } from "@/types";

import Views from "@/components/main/views";
import Rating from "@/components/main/rating";
import ViewsLoader from "@/components/main/views-loader";
import DynamicImage from "@/components/main/dynamic-image";

const PostCard = ({
  post,
}: {
  post: Entry<PostEntrySkeleton, undefined, string>;
}) => {
  return (
    <Card className="bg-primary text-black rounded-t-md select-none shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/post/${post.fields.slug}`}>
          <CardTitle>
            <AspectRatio ratio={16 / 9}>
              <DynamicImage
                image={post.fields.coverImage as IAsset}
                className="rounded-t-md object-cover w-full"
                fill
              />
            </AspectRatio>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex justify-between items-center">
          <Link href={`/post/${post.fields.slug}`}>
            <p className="font-extrabold text-2xl md:text-4xl hover:underline">
              {post.fields.title}
            </p>
          </Link>
          <p className="text-sm font-light text-white">
            {format(post.fields.date, "dd / MM / yyyy")}
          </p>
        </div>
        <Suspense
          fallback={
            <Skeleton className="w-[100px] h-5 mt-2.5 rounded-md bg-secondary" />
          }
        >
          <Rating
            slug={post.fields.slug}
            fillColor="#9D966D"
            strokeColor="#000"
          />
        </Suspense>
      </CardContent>
      <CardFooter className="pb-2 flex justify-between items-center">
        {post.fields.category ? (
          <Link
            href={`/works/${
              (post.fields.type as unknown as IType).fields.slug
            }/${(post.fields.category as unknown as ICategory).fields.slug}`}
            key={(post.fields.category as unknown as ICategory).fields.slug}
            className="hover:underline sm:text-lg lg:text-2xl"
          >
            {(post.fields.category as unknown as ICategory).fields.name}
          </Link>
        ) : (
          <Link
            href={`/works/${
              (post.fields.type as unknown as IType).fields.slug
            }`}
            key={(post.fields.type as unknown as IType).fields.slug}
            className="hover:underline sm:text-lg lg:text-2xl"
          >
            {(post.fields.type as unknown as IType).fields.name}
          </Link>
        )}

        <Suspense fallback={<ViewsLoader />}>
          <Views readOnly slug={post.fields.slug} />
        </Suspense>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
