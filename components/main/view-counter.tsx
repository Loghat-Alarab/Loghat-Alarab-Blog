"use client";

import { useEffect, startTransition } from "react";

import { FINISH_READING } from "@/constants";
import { updatePostViews } from "@/lib/actions/post";

const ViewCounter = ({ slug, userId }: { slug: string; userId: string }) => {
  useEffect(() => {
    const timer = setTimeout(
      () => {
        console.log("Done reading");
        startTransition(() => {
          updatePostViews(slug, userId);
        });
      },
      // 3 * 1000
      FINISH_READING
    );

    return () => clearTimeout(timer);
  }, [slug, userId]);

  return <></>;
};
export default ViewCounter;
