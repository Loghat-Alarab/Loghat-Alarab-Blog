//@ts-nocheck
"use server";
import "server-only";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

// import { wait } from "@/lib/utils";
import { LIMIT } from "@/constants";
import { PostEntrySkeleton } from "@/types";
import { connectToDatabase } from "@/lib/db/mongoose";
import { client, previewClient } from "@/lib/contentful";

import Post from "@/lib/models/postModel";
import User from "@/lib/models/userModel";

export const getPostsByType = async (type: string, page?: number) => {
  const skipAmount = page ? (page - 1) * LIMIT : 0;

  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.type.sys.contentType.sys.id": "type",
    "fields.type.fields.slug": type,
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

export const getSpecialPosts = async () => {
  const response = await client.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.special": true,
    order: "-sys.createdAt",
    limit: LIMIT,
  });

  return response.items;
};

export const getPostBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const post = await Post.findOneAndUpdate(
      { slug },
      { $setOnInsert: { slug } },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    )
      .populate({
        path: "comments.user",
        model: User,
        select: "_id email name image",
      })
      .select("_id slug comments reviews views favorites")
      .lean();

    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getPostComments = async (slug: string) => {
  try {
    await connectToDatabase();

    const post = await Post.findOneAndUpdate(
      { slug },
      { $setOnInsert: { slug } },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    )
      .populate({
        path: "comments.user",
        model: User,
        select: "_id email name image",
      })
      .select("comments")
      .lean();

    const comments = post.comments.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return comments;
  } catch (error) {
    console.log(error);
  }
};
