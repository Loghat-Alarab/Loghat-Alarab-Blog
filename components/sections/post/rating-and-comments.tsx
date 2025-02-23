import { headers } from "next/headers";

import { Suspense } from "react";
import { Types } from "mongoose";
import { arEG } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { CircleUserRound } from "lucide-react";

import Link from "next/link";

import { api } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPostBySlug, getPostComments } from "@/lib/data/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import AddRating from "@/components/main/add-rating";
import AddComment from "@/components/main/add-comment";
import UpdateRating from "@/components/main/update-rating";
import DeleteComment from "@/components/main/delete-comment";

interface RatingAndCommentsProps {
  slug: string;
}

const RatingAndComments = ({ slug }: RatingAndCommentsProps) => {
  return (
    <section className="mx-auto">
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">قم بإضافة تقييم</h2>
        <Suspense fallback={<Skeleton className="w-64 h-9" />}>
          <Rating slug={slug} />
        </Suspense>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">التعليقات</h2>
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments slug={slug} />
        </Suspense>
      </div>
    </section>
  );
};
export default RatingAndComments;

const Rating = async ({ slug }: RatingAndCommentsProps) => {
  const session = await api.getSession({
    headers: await headers(),
  });
  const post = await getPostBySlug(slug);

  if (session) {
    const userId = new Types.ObjectId(session.user.id);
    const alreadyRated = post?.reviews?.find((review) =>
      userId.equals(review.user)
    );

    if (alreadyRated)
      return (
        <UpdateRating
          slug={slug}
          userId={session.user.id}
          value={alreadyRated.rating}
        />
      );
    else return <AddRating slug={slug} userId={session.user.id} />;
  } else
    return (
      <>
        <p className="text-base text-destructive mb-4">
          سجل الدخول لإضافة تقييم
        </p>
        <Button variant="outline" asChild>
          <Link href="/auth/login">تسجيل الدخول</Link>
        </Button>
      </>
    );
};

const Comments = async ({ slug }: RatingAndCommentsProps) => {
  const session = await api.getSession({
    headers: await headers(),
  });
  const comments = await getPostComments(slug);

  const userId = new Types.ObjectId(session?.user.id);

  return (
    <div className="space-y-4">
      {comments?.length ? (
        comments?.map((comment) => (
          <div
            key={comment._id}
            className="flex space-x-4 bg-muted p-4 rounded-lg"
          >
            <Avatar>
              <AvatarImage src={comment.user.image} alt={comment.user.name} />
              <AvatarFallback>
                <CircleUserRound />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-lg">{comment.user.name}</h3>
                <p className="text-muted-foreground">
                  {formatDistanceToNow(comment.createdAt, {
                    addSuffix: true,
                    locale: arEG,
                  })}
                </p>
                {userId.equals(comment.user._id) && (
                  <DeleteComment slug={slug} userId={session?.user.id ?? ""} />
                )}
              </div>
              <p className="text-lg">{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-base">لا يوجد تعليقات</div>
      )}
      {session && <AddComment slug={slug} userId={session.user.id} />}
    </div>
  );
};

const CommentsSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 bg-muted p-4 rounded-lg">
        <div className="flex gap-4">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-24 h-7" />
        </div>
        <Skeleton className="w-full h-7" />
      </div>
      <div className="flex flex-col gap-4 bg-muted p-4 rounded-lg">
        <div className="flex gap-4">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-24 h-7" />
        </div>
        <Skeleton className="w-full h-7" />
      </div>
      <div className="flex flex-col gap-4 bg-muted p-4 rounded-lg">
        <div className="flex gap-4">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-24 h-7" />
        </div>
        <Skeleton className="w-full h-7" />
      </div>
    </div>
  );
};
