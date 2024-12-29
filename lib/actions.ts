import "server-only";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";

// import { wait } from "./utils";
import { LIMIT } from "@/constants";
import { client, previewClient } from "./contentful";
import { CategoryEntrySkeleton, PostEntrySkeleton } from "@/types";

export const getCategories = async (type: string) => {
  const response = await client.getEntries<CategoryEntrySkeleton>({
    content_type: "category",
    "fields.type": type,
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

export const getPostsByType = async (
  type: "blogs" | "characters" | "stories",
  page?: number
) => {
  const skipAmount = page ? (page - 1) * LIMIT : 0;

  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.type": type,
    limit: LIMIT,
    skip: skipAmount,
  });

  return response.items;
};

export const getPostsByCategory = async (category: string, page?: number) => {
  const skipAmount = page ? (page - 1) * LIMIT : 0;

  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.category.sys.contentType.sys.id": "category",
    "fields.category.fields.slug": category,
    limit: LIMIT,
    skip: skipAmount,
  });

  return response.items;
};

export const getPost = async (slug: string) => {
  const { isEnabled } = await draftMode();
  const cfClient = isEnabled ? previewClient : client;

  const response = await cfClient.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.slug": slug,
  });

  if (!response.items.length) {
    notFound();
  }

  // await wait(3000);

  return { post: response.items.at(0)!, isEnabled };
};

export const getAllPosts = async () => {
  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
  });

  return response.items;
};

export const getPostsByQuery = async (query: string, page?: number) => {
  const skipAmount = page ? (page - 1) * LIMIT : 0;

  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    query,
    limit: LIMIT,
    skip: skipAmount,
  });

  return response.items;
};

export const getLatestPosts = async (page?: number) => {
  const skipAmount = page ? (page - 1) * LIMIT : 0;

  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    // @ts-expect-error not same
    order: "-sys.createdAt",
    limit: LIMIT,
    skip: skipAmount,
  });

  return response.items;
};

export const getSpecialPost = async () => {
  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.special": true,
  });

  return response.items.at(0);
};

export const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const plaiceholder = await getPlaiceholder(buffer, { size: 10 });

  return plaiceholder;
};
