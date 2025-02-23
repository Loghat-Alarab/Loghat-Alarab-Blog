import { Rating as RatingStars, ThinRoundedStar } from "@smastrom/react-rating";

import { getPostBySlug } from "@/lib/data/posts";

interface RatingProps {
  slug: string;
  fillColor: string;
  strokeColor: string;
}

const Rating = async ({ slug, fillColor, strokeColor }: RatingProps) => {
  const post = await getPostBySlug(slug);

  const ratings = post?.reviews?.map((review) => review.rating) ?? [];
  // const rating = post?.reviews?.reduce((acc, review) => acc + review.rating, 0);
  const rating =
    ratings.length > 0
      ? Math.max(
          1,
          Math.min(
            5,
            Math.round(ratings.reduce((sum, r) => sum + r, 0) / ratings.length)
          )
        )
      : 0;

  return (
    <div className="flex items-center gap-4">
      <RatingStars
        readOnly
        style={{ maxWidth: 100, marginTop: 10 }}
        value={rating ?? 0}
        // transition="position"
        itemStyles={{
          itemShapes: ThinRoundedStar,
          activeFillColor: strokeColor,
          inactiveFillColor: fillColor,
          inactiveStrokeColor: strokeColor,
          activeStrokeColor: strokeColor,
          itemStrokeWidth: 3,
        }}
      />
      <span className="mt-2.5">{ratings.length}</span>
    </div>
  );
};
export default Rating;
