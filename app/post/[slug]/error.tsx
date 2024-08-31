"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-40">
      <h2 className="text-center font-bold text-5xl mt-20">حدث خطأ ما!</h2>
      <Button
        className="block mx-auto"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        حاول مرى أخرى
      </Button>
    </div>
  );
}
