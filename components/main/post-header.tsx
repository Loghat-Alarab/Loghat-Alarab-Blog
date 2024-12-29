import { Entry } from "contentful";

import { IAsset, PostEntrySkeleton } from "@/types";
import { formatDate } from "@/lib/utils";
import DynamicImage from "./dynamic-image";

const PostHeader = ({
  post,
}: {
  post: Entry<PostEntrySkeleton, undefined, string>;
}) => {
  const { title, coverImage, date } = post.fields;

  return (
    <>
      <h1 className="text-center">{title}</h1>
      <p className="text-sm text-gray-400">{formatDate(date)}</p>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <DynamicImage
          image={coverImage as IAsset}
          alt={`Cover Image for ${title}`}
          className="w-full"
        />
        {/* <Image
          alt={`Cover Image for ${title}`}
          src={`https:${(coverImage as IAsset).fields.file.url}`}
          width={(coverImage as IAsset).fields.file.details.image.width}
          height={(coverImage as IAsset).fields.file.details.image.height}
          className="w-full"
        /> */}
      </div>
    </>
  );
};

export default PostHeader;
