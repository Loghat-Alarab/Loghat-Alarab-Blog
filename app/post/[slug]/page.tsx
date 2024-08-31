export const revalidate = 3600;

import Link from "next/link";
import type { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPost } from "@/lib/actions";
import PostBody from "@/components/main/post-body";
import PostHeader from "@/components/main/post-header";
import PreviewAlert from "@/components/main/preview-alert";
import { IAsset, ICategory } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // fetch data
  const { post } = await getPost(params.slug);

  console.log(`https:${(post.fields.coverImage as IAsset).fields.file.url}`);

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
  };
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const { post, isEnabled } = await getPost(params.slug);

  console.log(post);

  return (
    <section>
      {isEnabled && <PreviewAlert />}
      <div className="my-10">
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
                <Link href={`/${post.fields.type}`}>
                  {post.fields.type === "blogs"
                    ? "مقالات"
                    : post.fields.type === "characters"
                    ? "شخصيات"
                    : "قصص و عبر"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${post.fields.type}/${
                    (post.fields.category as ICategory).fields.slug
                  }`}
                >
                  {(post.fields.category as ICategory).fields.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container">
        <article className="prose dark:prose-invert lg:prose-h1:leading-[60px] prose-sm sm:prose-base lg:prose-lg mx-auto">
          <PostHeader post={post} />
          <PostBody post={post} />
        </article>
      </div>
    </section>
  );
};
export default Post;
