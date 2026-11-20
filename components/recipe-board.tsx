"use client";

import { useState } from "react";
import { SWAP_NOTE, ingredientName, stepNote, swapCount, type Recipe } from "@/lib/recipes";

/** Ingredients (with the pantry-swap toggle) and the method. Swapped lines say what they replace, and the method follows the swaps. */
export function RecipeBoard({ recipe }: { recipe: Recipe }) {
  const [swapOn, setSwapOn] = useState(false);
  const swaps = swapCount(recipe);
  return (
    <>
      <h2>Ingredients</h2>
      {swaps > 0 ? (
        <p className="rb-swap">
          <button type="button" className={swapOn ? "rs-button" : "rs-plain rb-toggle"} aria-pressed={swapOn} onClick={() => setSwapOn((value) => !value)}>
            {/* One name in both states; aria-pressed carries on/off. */}
            {`Use ${swaps} pantry ${swaps === 1 ? "swap" : "swaps"}`}
          </button>
        </p>
      ) : null}
      <ul className="rb-ingredients">
        {recipe.ingredients.map((ingredient) => {
          const swapped = swapOn && Boolean(ingredient.swap);
          return (
            <li key={ingredient.name} data-swapped={swapped ? "true" : undefined}>
              <strong>{ingredientName(ingredient, swapOn)}</strong> · {ingredient.amount}
              {swapped ? <span className="rs-tag rb-tag">Swap for {ingredient.name}</span> : null}
            </li>
          );
        })}
      </ul>
      <h2>Method</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={step.label}>
            <strong>{step.label}.</strong> {stepNote(step, swapOn)}
            {swapOn && index === 1 ? <span className="rb-note"> Swap note: {SWAP_NOTE}</span> : null}
          </li>
        ))}
      </ol>
    </>
  );
}
