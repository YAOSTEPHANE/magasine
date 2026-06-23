import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/data";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryBySlug(slug);
  if (!data) return { title: "Section not found" };

  return {
    title: data.category.name,
    description: data.category.description ?? `Articles in the ${data.category.name} section`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCategoryBySlug(slug);
  if (!data) notFound();

  const { category, articles } = data;

  return (
    <CategoryPageView
      category={{
        name: category.name,
        slug: category.slug,
        description: category.description,
      }}
      articles={articles}
    />
  );
}
