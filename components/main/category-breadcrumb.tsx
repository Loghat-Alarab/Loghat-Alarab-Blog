import { Entry } from "contentful";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CategoryEntrySkeleton, IType } from "@/types";

interface CategoryBreadcrumbProps {
  category: Entry<CategoryEntrySkeleton, undefined, string>;
}

const CategoryBreadcrumb = ({ category }: CategoryBreadcrumbProps) => {
  return (
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
                (category.fields.type as unknown as IType).fields.slug
              }`}
            >
              {(category.fields.type as unknown as IType).fields.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{category.fields.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default CategoryBreadcrumb;
