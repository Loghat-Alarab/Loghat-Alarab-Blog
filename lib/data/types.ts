"use server";
import "server-only";

// import { wait } from "./utils";
import { client } from "@/lib/contentful";
import { TypeEntrySkeleton } from "@/types";

export const getAllTypes = async () => {
  const response = await client.getEntries<TypeEntrySkeleton>({
    content_type: "type",
    // @ts-expect-error not same
    order: "sys.createdAt",
  });

  return response.items;
};

export const getType = async (slug: string) => {
  const response = await client.getEntries<TypeEntrySkeleton>({
    content_type: "type",
    "fields.slug": slug,
  });

  return response.items.at(0);
};
