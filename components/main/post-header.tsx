import { Suspense } from "react";
import { format } from "date-fns";
import { Entry } from "contentful";
import { arEG } from "date-fns/locale";
// import { Heart } from "lucide-react";

// import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IAsset, PostEntrySkeleton } from "@/types";

import Views from "@/components/main/views";
import Rating from "@/components/main/rating";
import ViewsLoader from "@/components/main/views-loader";
import DynamicImage from "@/components/main/dynamic-image";

const PostHeader = ({
  post,
}: {
  post: Entry<PostEntrySkeleton, undefined, string>;
}) => {
  const { slug, title, coverImage, date } = post.fields;

  return (
    <>
      <DynamicImage
        image={coverImage as IAsset}
        alt={`Cover Image for ${title}`}
        className="w-full"
      />
      <div className="flex items-center justify-between">
        <Suspense
          fallback={<Skeleton className="w-[100px] h-5 mt-2.5 rounded-md" />}
        >
          <Rating slug={slug} strokeColor="#9D966D" fillColor="#0e0e0b" />
        </Suspense>

        {/* TODO: add suspense */}
        {/* <Button>
          أضف إلى المفضلة
          <Heart />
        </Button> */}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-muted-foreground">
          {format(date, "d MMMM, yyyy", {
            locale: arEG,
          })}
        </time>

        <Suspense fallback={<ViewsLoader />}>
          <Views slug={slug} />
        </Suspense>
      </div>
      <h1>{title}</h1>
    </>
  );
};

export default PostHeader;
