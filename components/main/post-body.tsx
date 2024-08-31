import RichText from "./rich-text";
import { Entry } from "contentful";
import { PostEntrySkeleton } from "@/types";

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
