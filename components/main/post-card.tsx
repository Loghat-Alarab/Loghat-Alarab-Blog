import { Entry } from "contentful";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IAsset, ICategory, PostEntrySkeleton } from "@/types";

import DynamicImage from "./dynamic-image";

const PostCard = ({
  post,
}: {
  post: Entry<PostEntrySkeleton, undefined, string>;
}) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`/post/${post.fields.slug}`}>
          <CardTitle>
            <AspectRatio ratio={16 / 9}>
              <DynamicImage
                image={post.fields.coverImage as IAsset}
                className="rounded-md object-cover w-full"
                fill
              />
            </AspectRatio>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="my-2">
          <Link
            href={`/${(post.fields.category as ICategory).fields.type}/${
              (post.fields.category as ICategory).fields.slug
            }`}
            key={(post.fields.category as ICategory).fields.slug}
            className="hover:underline text-xs sm:text-sm lg:text-base"
          >
            {(post.fields.category as ICategory).fields.name}
          </Link>
        </p>
        <Link href={`/post/${post.fields.slug}`}>
          <p className="font-bold sm:text-xl lg:text-2xl hover:text-primary transition-colors duration-300">
            {post.fields.title}
          </p>
        </Link>
      </CardContent>
      <CardFooter>
        <p className="text-sm font-light">{formatDate(post.fields.date)}</p>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
