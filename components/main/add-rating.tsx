"use client";

import { BeatLoader } from "react-spinners";
import { startTransition, useState } from "react";
import { Rating as RatingStars, ThinRoundedStar } from "@smastrom/react-rating";

import { Button } from "@/components/ui/button";
import { addPostRating } from "@/lib/actions/post";

interface AddRatingProps {
  slug: string;
  userId: string;
}

const AddRating = ({ slug, userId }: AddRatingProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const addRating = async () => {
    setLoading(true);
    setError("");
    if (!rating) {
      setError("من فضلك أدخل تقييم");
      setLoading(false);
      return;
    }

    startTransition(() => {
      addPostRating(slug, userId, rating)
        .catch((error) => {
          console.log(error);
          setError("حدث خطأ ما");
        })
        .finally(() => setLoading(false));
    });
  };

  return (
    <>
      <div className="flex gap-4">
        {loading ? (
          <BeatLoader color="#9D966D" size={30} />
        ) : (
          <>
            <RatingStars
              style={{
                maxWidth: 150,
              }}
              isDisabled={loading}
              value={rating ?? 0}
              transition="position"
              onChange={setRating}
              itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: "#9D966D",
                inactiveFillColor: "#0e0e0b",
                inactiveStrokeColor: "#9D966D",
                activeStrokeColor: "#9D966D",
                itemStrokeWidth: 3,
              }}
            />

            <Button disabled={loading} onClick={addRating}>
              حفظ التقييم
            </Button>
          </>
        )}
      </div>
      {error && <p className="text-base text-destructive">{error}</p>}
    </>
  );
};
export default AddRating;
