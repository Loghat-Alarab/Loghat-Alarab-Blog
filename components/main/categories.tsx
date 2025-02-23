import Link from "next/link";

import { getCategories } from "@/lib/data/categories";

interface CategoriesProps {
  slug: string;
}

const Categories = async ({ slug }: CategoriesProps) => {
  const categories = await getCategories(slug);

  return (
    <>
      {categories.map((category) => (
        <Link
          href={`/works/${slug}/${category.fields.slug}`}
          key={category.fields.slug}
        >
          <h3 className="hover:underline text-xs sm:text-base lg:text-2xl font-bold hover:text-primary transition-colors duration-300">
            {category.fields.name}
          </h3>
        </Link>
      ))}
    </>
  );
};
export default Categories;
