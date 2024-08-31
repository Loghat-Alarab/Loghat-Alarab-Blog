import Link from "next/link";
import Image from "next/image";
import { Entry } from "contentful";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IAsset, ICategory } from "@/types";
import { formatDate } from "@/lib/utils";
import { PostEntrySkeleton } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
              <Image
                // loader={(p) => `${p.src}?w=${p.width}&q=${p.quality || 75}`}
                src={`https:${
                  (post.fields.coverImage as IAsset).fields.file.url
                }`}
                alt={(post.fields.coverImage as IAsset).fields.title}
                width={
                  (post.fields.coverImage as IAsset).fields.file.details.image
                    .width
                }
                height={
                  (post.fields.coverImage as IAsset).fields.file.details.image
                    .height
                }
                className="rounded-md object-cover w-full"
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
