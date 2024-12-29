import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { slug } = await request.json();

  const url = `/post/${slug["en-US"]}`;

  revalidatePath(url);

  return Response.json({ slug: slug["en-US"] }, { status: 200 });
}
