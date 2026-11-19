import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipePage } from "@/components/recipe-pages";
import { recipes } from "@/lib/recipes";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return {};
  return {
    title: `${recipe.name} | Recipe Explorer`,
    description: `${recipe.name}: ${recipe.ingredients.length} ingredients, ${recipe.steps.length} steps, about ${recipe.time}.`,
    alternates: { canonical: `/recipes/${recipe.id}` },
  };
}

export default async function Recipe({ params }: Props) {
  const { id } = await params;
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) notFound();
  return <RecipePage recipe={recipe} />;
}
