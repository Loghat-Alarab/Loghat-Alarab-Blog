"use server";

import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { CategoryEntrySkeleton, PostEntrySkeleton } from "@/types";
import { client, previewClient } from "./contentful";
import { LIMIT } from "./constants";

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
  const { isEnabled } = draftMode();
  const cfClient = isEnabled ? previewClient : client;

  const response = await cfClient.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.slug": slug,
  });

  if (!response.items.length) {
    notFound();
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { post: response.items.at(0)!, isEnabled };
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
    // @ts-ignore
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
