import { Entry } from "contentful";

import { PostEntrySkeleton } from "@/types";

import RichText from "./rich-text";

const PostBody = ({
  post,
}: {
  post: Entry<PostEntrySkeleton, undefined, string>;
}) => {
  const { content } = post.fields;

  return (
    <div className="mx-auto">
      <RichText content={content} />
    </div>
  );
};

export default PostBody;
