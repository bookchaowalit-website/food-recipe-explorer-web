// Recipe data and pure helpers shared by the page. Three synthetic recipes; not nutrition advice.

export type Ingredient = { name: string; amount: string; swap?: string };
export type Recipe = { id: string; code: string; name: string; origin: string; time: string; servings: string; ingredients: Ingredient[]; steps: { label: string; note: string }[] };

export const recipes: Recipe[] = [
  { id: "tomato-rice", code: "01", name: "Tomato rice with greens", origin: "pantry / one pot", time: "32 min", servings: "2 bowls", ingredients: [{ name: "jasmine rice", amount: "180 g" }, { name: "ripe tomato", amount: "2 medium", swap: "canned tomato" }, { name: "garlic", amount: "2 cloves" }, { name: "leafy greens", amount: "2 handfuls", swap: "cabbage" }], steps: [{ label: "Rinse & rest", note: "Rinse the rice until the water is nearly clear. Let it stand while the tomato softens." }, { label: "Build the base", note: "Warm oil, turn the garlic pale gold, then press in the tomato until it becomes a rough sauce." }, { label: "Cover & finish", note: "Fold in rice and water, cover, then finish with greens when the grains are tender." }] },
  { id: "miso-noodles", code: "02", name: "Miso noodles with lime", origin: "quick / bright", time: "18 min", servings: "1 generous bowl", ingredients: [{ name: "wheat noodles", amount: "120 g" }, { name: "white miso", amount: "1 tbsp", swap: "tahini" }, { name: "lime", amount: "1 half" }, { name: "spring onion", amount: "2 stalks", swap: "chives" }], steps: [{ label: "Make the broth", note: "Loosen miso with hot noodle water. Keep it warm, never boiling, so the broth stays round." }, { label: "Boil & dress", note: "Cook the noodles one minute shy of done, then turn them through the broth and lime." }, { label: "Cut the green", note: "Slice the onion at an angle and scatter it at the table for a fresh, sharp finish." }] },
  { id: "coconut-lentils", code: "03", name: "Coconut lentils", origin: "slow / comforting", time: "44 min", servings: "3 portions", ingredients: [{ name: "red lentils", amount: "220 g" }, { name: "coconut milk", amount: "1 can", swap: "plain yoghurt + water" }, { name: "ground cumin", amount: "1 tsp" }, { name: "lemon", amount: "1 half", swap: "rice vinegar" }], steps: [{ label: "Toast the spice", note: "Let cumin warm in the pot until it smells nutty, then add onion and a pinch of salt." }, { label: "Simmer softly", note: "Add lentils, coconut milk, and water. Stir every few minutes until the edges go creamy." }, { label: "Balance the bowl", note: "Add lemon at the end. Taste for salt and leave the lentils loose enough to spoon." }] },
];

export const SWAP_NOTE = "Use the pantry swap gently: loosen it before it meets the heat so the base stays smooth.";

export function findRecipe(id: string): Recipe {
  return recipes.find((item) => item.id === id) ?? recipes[0];
}

// With swaps on, every ingredient that has a pantry swap shows the swap instead.
export function ingredientName(ingredient: Ingredient, swapOn: boolean): string {
  return swapOn && ingredient.swap ? ingredient.swap : ingredient.name;
}

export function swapCount(recipe: Recipe): number {
  return recipe.ingredients.filter((ingredient) => ingredient.swap).length;
}

// The base-building step (second step) carries the swap note while swaps are on.
export function prepNote(recipe: Recipe, stepIndex: number, swapOn: boolean): string {
  const step = recipe.steps[stepIndex] ?? recipe.steps[0];
  return swapOn && stepIndex === 1 ? SWAP_NOTE : step.note;
}

export function stepCounter(stepIndex: number, total: number): string {
  return `${String(stepIndex + 1).padStart(2, "0")} / ${total}`;
}
