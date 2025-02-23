"use client";

import { Button } from "@/components/ui/button";
import { startTransition, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { addPostComment } from "@/lib/actions/post";

interface AddCommentProps {
  slug: string;
  userId: string;
}

const AddComment = ({ slug, userId }: AddCommentProps) => {
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!comment.trim()) {
      setError("من فضلك أدخل التعليق");
      setLoading(false);
      return;
    }
    if (comment.trim().length < 10) {
      setError("التعليق يجب ان يكون أكثر من 10 أحرف");
      setLoading(false);
      return;
    }

    startTransition(() => {
      addPostComment(slug, userId, comment)
        .then((data) => {
          if (data?.commented) {
            setError("لقد قمت بالتعليق بالفعل");
          } else {
            setComment("");
          }
        })
        .catch((error) => {
          console.log(error);
          setError("حدث خطأ ما");
        })
        .finally(() => setLoading(false));
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <Textarea
        disabled={loading}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="أضف تعليق..."
        className="w-full max-h-40"
      />
      {error && <p className="text-base text-destructive">{error}</p>}
      <Button disabled={loading} type="submit">
        إضافة
      </Button>
    </form>
  );
};
export default AddComment;
