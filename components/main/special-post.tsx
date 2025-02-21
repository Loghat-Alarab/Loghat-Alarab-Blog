import { Entry } from "contentful";

import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IAsset, ICategory, PostEntrySkeleton } from "@/types";

import DynamicImage from "./dynamic-image";
import { Card } from "../ui/card";

const SpecialPost = ({
  post,
}: {
  post: Entry<PostEntrySkeleton, undefined, string>;
}) => {
  return (
    <>
      <p className="mb-6">المميز</p>
      <Card className="flex flex-col sm:flex-row mb-10 p-6 lg:w-3/4 mx-auto">
        <div className="sm:w-1/2">
          <Link href={`/post/${post.fields.slug}`}>
            <AspectRatio ratio={16 / 9}>
              <DynamicImage
                image={post.fields.coverImage as IAsset}
                className="rounded-md object-cover w-full"
                fill
              />
            </AspectRatio>
          </Link>
        </div>
        <div className="sm:w-1/2 flex flex-col justify-evenly py-2 sm:p-8 gap-2">
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
          <p className="text-sm font-light">{formatDate(post.fields.date)}</p>
        </div>
      </Card>
    </>
  );
};
export default SpecialPost;
