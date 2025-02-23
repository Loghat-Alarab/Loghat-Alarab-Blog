import { headers } from "next/headers";
import { Eye } from "lucide-react";

import { api } from "@/lib/auth";
import { getPostBySlug } from "@/lib/data/posts";

import ViewCounter from "./view-counter";

interface ViewsProps {
  slug: string;
  readOnly?: boolean;
}

const Views = async ({ slug, readOnly }: ViewsProps) => {
  const session = await api.getSession({
    headers: await headers(),
  });
  const post = await getPostBySlug(slug);

  const views = post?.views.length;
  const alreadyRead =
    session && !readOnly && post?.views.includes(session.user.id);

  return (
    <div className="flex items-center gap-2">
      <span className="text-white">{views ?? 0}</span>
      <Eye size={24} />
      {session && !alreadyRead && !readOnly && (
        <ViewCounter slug={slug} userId={session.user.id} />
      )}
    </div>
  );
};
export default Views;
