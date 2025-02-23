import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategory } from "@/lib/data/categories";

import CategoryBreadcrumb from "@/components/main/category-breadcrumb";

interface CategoryLayoutProps {
  params: Promise<{
    category: string;
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: CategoryLayoutProps): Promise<Metadata> {
  const slug = (await params).category;
  const category = await getCategory(slug);
  if (!category) notFound();

  return {
    title: `${category.fields.name}`,
  };
}

const CategoryLayout = async ({ children, params }: CategoryLayoutProps) => {
  const slug = (await params).category;
  const category = await getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <CategoryBreadcrumb category={category} />
      {children}
    </>
  );
};
export default CategoryLayout;
