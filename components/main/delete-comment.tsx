"use client";

import { Trash } from "lucide-react";
import { startTransition } from "react";

import { Button } from "@/components/ui/button";
import { removePostComment } from "@/lib/actions/post";

interface DeleteCommentProps {
  slug: string;
  userId: string;
}

const DeleteComment = ({ slug, userId }: DeleteCommentProps) => {
  const deleteComment = async () => {
    startTransition(() => {
      removePostComment(slug, userId);
    });
  };

  return (
    <Button onClick={deleteComment} variant="secondary" size="icon">
      <Trash />
    </Button>
  );
};
export default DeleteComment;
