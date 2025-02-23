// route handler with secret and slug
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { PostEntrySkeleton } from "@/types";
import { previewClient } from "@/lib/contentful";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Parse query string parameters
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const response = await previewClient.getEntries<PostEntrySkeleton>({
    content_type: "post",
    "fields.slug": slug,
  });

  const post = response.items.at(0);

  if (!post) {
    return new Response("Invalid slug", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  const url = `/post/${post.fields.slug}`;

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(url);
}
