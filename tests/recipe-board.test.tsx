// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { RecipeBoard } from "@/components/recipe-board";
import { SWAP_NOTE, findRecipe, recipes } from "@/lib/recipes";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root;
let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe("pantry swaps", () => {
  it("marks each swapped line with what it replaces and adds the swap note to the base step", () => {
    act(() => root.render(<RecipeBoard recipe={findRecipe("tomato-rice")} />));
    const toggle = host.querySelector("button")!;
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(host.querySelectorAll("[data-swapped]")).toHaveLength(0);
    act(() => toggle.click());
    expect(toggle.textContent).toBe("Use 2 pantry swaps");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    const swapped = [...host.querySelectorAll("[data-swapped] ")].map((li) => li.textContent);
    expect(swapped).toEqual(["canned tomato · 2 mediumSwap for ripe tomato", "cabbage · 2 handfulsSwap for leafy greens"]);
    expect(host.textContent).toContain(SWAP_NOTE);
    act(() => toggle.click());
    expect(host.textContent).not.toContain(SWAP_NOTE);
  });

  it("rewrites the method to match the swapped ingredients", () => {
    for (const recipe of recipes) {
      act(() => root.render(<RecipeBoard recipe={recipe} />));
      const method = () => host.querySelector("ol")!.textContent!;
      act(() => host.querySelector("button")!.click());
      for (const ingredient of recipe.ingredients.filter((item) => item.swap)) {
        expect(method(), `${recipe.id}: ${ingredient.name}`).not.toContain(ingredient.name);
        const word = ingredient.name.split(" ").at(-1)!;
        if (!ingredient.swap!.includes(word)) expect(method(), `${recipe.id}: ${word}`).not.toMatch(new RegExp(`\\b${word}\\b`, "i"));
      }
      act(() => host.querySelector("button")!.click());
      act(() => root.unmount());
      root = createRoot(host);
    }
    act(() => root.render(<RecipeBoard recipe={findRecipe("coconut-lentils")} />));
    act(() => host.querySelector("button")!.click());
    expect(host.querySelector("ol")!.textContent).toContain("plain yoghurt");
    expect(host.querySelector("ol")!.textContent).toContain("Add rice vinegar at the end.");
  });

  it("hides the toggle for a recipe with no swaps and words a single swap", () => {
    const base = recipes[0];
    act(() => root.render(<RecipeBoard recipe={{ ...base, ingredients: base.ingredients.map(({ name, amount }) => ({ name, amount })) }} />));
    expect(host.querySelector("button")).toBeNull();
    act(() => root.render(<RecipeBoard recipe={{ ...base, ingredients: [base.ingredients[1]] }} />));
    expect(host.querySelector("button")!.textContent).toBe("Use 1 pantry swap");
  });
});
