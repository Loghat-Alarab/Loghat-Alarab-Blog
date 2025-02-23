"use server";
import "server-only";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/db/mongoose";

import Post from "@/lib/models/postModel";
import User from "@/lib/models/userModel";

export const updatePostViews = async (slug: string, userId: string) => {
  try {
    await connectToDatabase();

    await Post.findOneAndUpdate(
      { slug },
      { $push: { views: userId } },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    );
    await User.findByIdAndUpdate(userId, {
      $push: { views: slug },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/post/${slug}`);
};

export const addPostRating = async (
  slug: string,
  userId: string,
  rating: number
) => {
  try {
    await connectToDatabase();

    await Post.findOneAndUpdate(
      { slug },
      {
        $push: {
          reviews: {
            user: userId,
            rating,
          },
        },
      },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    );
    await User.findByIdAndUpdate(userId, {
      $push: { reviews: slug },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/post/${slug}`);
};

export const updatePostRating = async (
  slug: string,
  userId: string,
  rating: number
) => {
  try {
    await connectToDatabase();

    await Post.findOneAndUpdate(
      { slug, "reviews.user": userId },
      {
        $set: {
          "reviews.$.rating": rating,
        },
      },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    );
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/post/${slug}`);
};

export const addPostComment = async (
  slug: string,
  userId: string,
  content: string
) => {
  try {
    await connectToDatabase();

    const post = await Post.findOne({ slug, "comments.user": userId });

    if (post) return { commented: true };

    await Post.findOneAndUpdate(
      { slug },
      {
        $push: {
          comments: {
            user: userId,
            content,
          },
        },
      },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    );
    await User.findByIdAndUpdate(userId, {
      $addToSet: { comments: slug },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/post/${slug}`);
};

export const removePostComment = async (slug: string, userId: string) => {
  try {
    await connectToDatabase();

    await Post.findOneAndUpdate(
      { slug },
      {
        $pull: {
          comments: {
            user: userId,
          },
        },
      },
      { new: true, upsert: true, projection: { views: 1, _id: 0 } }
    );
    await User.findByIdAndUpdate(userId, {
      $pull: { comments: slug },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/post/${slug}`);
};
