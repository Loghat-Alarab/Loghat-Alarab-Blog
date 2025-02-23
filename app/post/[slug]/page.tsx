export const revalidate = 3600;
export const dynamicParams = true;
export const experimental_ppr = true;

import type { Metadata } from "next";
import { BeatLoader } from "react-spinners";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IAsset, ICategory, IType } from "@/types";
import { getAllPosts, getPost } from "@/lib/data/posts";

import PostBody from "@/components/main/post-body";
import PostHeader from "@/components/main/post-header";
import PreviewAlert from "@/components/main/preview-alert";
import { Suspense } from "react";
import RatingAndComments from "@/components/sections/post/rating-and-comments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const { post } = await getPost(slug);

  return {
    title: post.fields.title,
    description: post.fields.description,
    openGraph: {
      title: (post.fields.coverImage as IAsset).fields.title,
      description: (post.fields.coverImage as IAsset).fields.description,
      images: [
        { url: `https:${(post.fields.coverImage as IAsset).fields.file.url}` },
      ],
    },
    alternates: {
      canonical: `/post/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const { post, isEnabled } = await getPost(slug);

  return (
    <section id="post" className="pt-14 md:pt-20 px-4">
      {isEnabled && <PreviewAlert />}
      <div className="mb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/works/${
                    (post.fields.type as unknown as IType).fields.slug
                  }`}
                >
                  {(post.fields.type as unknown as IType).fields.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {post.fields.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/works/${
                        (post.fields.type as unknown as IType).fields.slug
                      }/${
                        (post.fields.category as unknown as ICategory).fields
                          .slug
                      }`}
                    >
                      {
                        (post.fields.category as unknown as ICategory).fields
                          .name
                      }
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section id="article-container">
        <article className="prose dark:prose-invert lg:prose-h1:leading-[60px] prose-base sm:prose-lg lg:prose-xl mx-auto">
          <PostHeader post={post} />
          <PostBody post={post} />
        </article>
      </section>

      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <BeatLoader color="#9D966D" size={50} />
          </div>
        }
      >
        <RatingAndComments slug={slug} />
      </Suspense>

      {/* <MorePosts /> */}
    </section>
  );
};
export default Post;
