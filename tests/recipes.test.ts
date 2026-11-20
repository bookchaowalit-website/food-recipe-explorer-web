import { describe, expect, it } from "vitest";
import { SWAP_NOTE, findRecipe, ingredientName, prepNote, recipes, stepCounter, stepNote, swapCount } from "@/lib/recipes";

const tomato = findRecipe("tomato-rice");

describe("recipes", () => {
  it("holds three synthetic recipes, each with steps, and falls back to the first", () => {
    expect(recipes.map((r) => r.code)).toEqual(["01", "02", "03"]);
    for (const recipe of recipes) expect(recipe.steps.length).toBeGreaterThanOrEqual(2);
    expect(findRecipe("nope").id).toBe("tomato-rice");
  });
});

describe("pantry swaps", () => {
  it("swaps every ingredient that has a swap, and only those", () => {
    expect(tomato.ingredients.map((i) => ingredientName(i, true))).toEqual(["jasmine rice", "canned tomato", "garlic", "cabbage"]);
    expect(tomato.ingredients.map((i) => ingredientName(i, false))).toEqual(["jasmine rice", "ripe tomato", "garlic", "leafy greens"]);
  });

  it("counts the swaps the toggle will apply", () => {
    // Regression: the button promised "one pantry swap" but the toggle swaps two ingredients in every recipe.
    expect(recipes.map(swapCount)).toEqual([2, 2, 2]);
  });
});

describe("prepNote", () => {
  it("shows the step's own note, and the swap note on step two while swaps are on", () => {
    expect(prepNote(tomato, 0, true)).toMatch(/^Rinse the rice/);
    expect(prepNote(tomato, 1, false)).toMatch(/^Warm oil/);
    expect(prepNote(tomato, 1, true)).toBe(SWAP_NOTE);
  });

  it("falls back to the first step for an out-of-range index", () => {
    expect(prepNote(tomato, 9, false)).toMatch(/^Rinse the rice/);
  });
});

describe("stepCounter", () => {
  it("pads the current step", () => {
    expect(stepCounter(0, 3)).toBe("01 / 3");
    expect(stepCounter(11, 12)).toBe("12 / 12");
  });
});

describe("index helpers", () => {
  it("splits the origin into tags and finds a recipe's position", async () => {
    const { originTags, recipeIndex, recipes } = await import("@/lib/recipes");
    expect(originTags(recipes[0])).toEqual(["pantry", "one pot"]);
    expect(recipeIndex("coconut-lentils")).toBe(2);
    expect(recipeIndex("nope")).toBe(-1);
  });
});

describe("stepNote", () => {
  it("uses the swapped wording only while swaps are on and the step has one", () => {
    const simmer = findRecipe("coconut-lentils").steps[1];
    expect(stepNote(simmer, false)).toContain("coconut milk");
    expect(stepNote(simmer, true)).toContain("plain yoghurt");
    const dress = findRecipe("miso-noodles").steps[1];
    expect(stepNote(dress, true)).toBe(dress.note);
  });
});
