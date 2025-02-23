import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getType } from "@/lib/data/types";

import TypeBreadcrumb from "@/components/main/type-breadcrumb";

interface TypeLayoutProps {
  params: Promise<{
    type: string;
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: TypeLayoutProps): Promise<Metadata> {
  const slug = (await params).type;
  const type = await getType(slug);
  if (!type) notFound();

  return {
    title: `${type.fields.name}`,
  };
}

const TypeLayout = async ({ children, params }: TypeLayoutProps) => {
  const slug = (await params).type;
  const type = await getType(slug);
  if (!type) notFound();
  else
    return (
      <>
        <TypeBreadcrumb type={type} />
        {children}
      </>
    );
};
export default TypeLayout;
