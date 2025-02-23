"use server";
import "server-only";

// import { wait } from "./utils";
import { client } from "@/lib/contentful";
import { CategoryEntrySkeleton } from "@/types";

export const getCategories = async (slug: string) => {
  //@ts-expect-error unknown
  const response = await client.getEntries<CategoryEntrySkeleton>({
    content_type: "category",
    "fields.type.sys.contentType.sys.id": "type",
    "fields.type.fields.slug": slug,
    order: "sys.createdAt",
  });

  return response.items;
};

export const getCategory = async (slug: string) => {
  const response = await client.getEntries<CategoryEntrySkeleton>({
    content_type: "category",
    "fields.slug": slug,
  });

  return response.items.at(0);
};
