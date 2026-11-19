import { ArticleHeader, EntryList, Pager, Prose, Reader, ReaderFoot, ReaderHead, ReaderTop, neighbours, plural } from "@/components/reader-shell";
import { RecipeBoard } from "@/components/recipe-board";
import { originTags, recipeIndex, recipes, swapCount, type Recipe } from "@/lib/recipes";

const SOURCE = "https://github.com/bookchaowalit-website/food-recipe-explorer-web";
const NOTE = "Three recipes written for this demo. A planning aid, not nutrition or medical advice.";

function Frame({ children, current }: { children: React.ReactNode; current: boolean }) {
  return (
    <Reader>
      <ReaderTop name="Recipe Explorer" tagline="Pantry recipes" links={[{ href: "/", label: "Recipes", current }]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} note={NOTE} />
    </Reader>
  );
}

export function RecipeIndexPage() {
  const times = recipes.map((recipe) => Number.parseInt(recipe.time, 10));
  return (
    <Frame current>
      <ReaderHead
        eyebrow={`${plural(recipes.length, "recipe")} · ${Math.min(...times)}–${Math.max(...times)} min`}
        title="Cook what the pantry can carry."
        lede="Choose a dish, see every ingredient and step on one page, and turn on the pantry swaps before the heat goes on."
      />
      <EntryList
        layout="cards"
        entries={recipes.map((recipe) => ({
          href: `/recipes/${recipe.id}`,
          title: recipe.name,
          meta: [recipe.time, recipe.servings],
          summary: `${plural(recipe.ingredients.length, "ingredient")}, ${plural(recipe.steps.length, "step")}, ${plural(swapCount(recipe), "pantry swap")}.`,
          tags: originTags(recipe),
        }))}
      />
    </Frame>
  );
}

export function RecipePage({ recipe }: { recipe: Recipe }) {
  const { previous, next } = neighbours(recipes, recipeIndex(recipe.id));
  return (
    <Frame current={false}>
      <article className="rs-article">
        <ArticleHeader
          back={{ href: "/", label: "All recipes" }}
          tags={originTags(recipe)}
          title={recipe.name}
          lede={`Makes ${recipe.servings} in about ${recipe.time}.`}
          meta={[plural(recipe.ingredients.length, "ingredient"), plural(recipe.steps.length, "step"), plural(swapCount(recipe), "pantry swap")]}
        />
        <Prose>
          <RecipeBoard recipe={recipe} />
        </Prose>
        <Pager
          label="More recipes"
          previous={previous ? { href: `/recipes/${previous.id}`, title: previous.name } : undefined}
          next={next ? { href: `/recipes/${next.id}`, title: next.name } : undefined}
        />
      </article>
    </Frame>
  );
}
