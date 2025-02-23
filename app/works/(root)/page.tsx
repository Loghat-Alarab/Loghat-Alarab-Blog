export const dynamic = "force-dynamic";

import { Fragment, Suspense } from "react";

import Link from "next/link";

import { getAllTypes } from "@/lib/data/types";
import { Skeleton } from "@/components/ui/skeleton";

import Categories from "@/components/main/categories";

export default async function Works() {
  const types = await getAllTypes();

  return (
    <div className="px-4 flex flex-col gap-y-4">
      {types.map((type) => (
        <Fragment key={type.fields.slug}>
          <Link href={`/works/${type.fields.slug}`}>
            <h2 className="hover:underline text-xl sm:text-3xl lg:text-5xl font-bold text-primary">
              {type.fields.name}
            </h2>
          </Link>

          <Suspense
            fallback={
              <>
                <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
                <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
                <Skeleton className="w-1/2 h-4 md:h-6 lg:h-8" />
              </>
            }
          >
            <Categories slug={type.fields.slug} />
          </Suspense>
        </Fragment>
      ))}
    </div>
  );
}
