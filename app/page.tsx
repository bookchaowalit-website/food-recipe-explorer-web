"use client";

import { useState } from "react";
import { findRecipe, ingredientName, prepNote, recipes, stepCounter, swapCount } from "@/lib/recipes";

export default function Home() {
  const [recipeId, setRecipeId] = useState("tomato-rice");
  const [stepIndex, setStepIndex] = useState(0);
  const [pantrySwap, setPantrySwap] = useState(false);
  const recipe = findRecipe(recipeId);
  const step = recipe.steps[stepIndex] ?? recipe.steps[0];
  function chooseRecipe(id: string) { setRecipeId(id); setStepIndex(0); setPantrySwap(false); }

  return (
    <main className="recipe-page"><div className="recipe-frame">
      <header className="recipe-header"><div className="recipe-brand"><span className="recipe-mark">RE</span><span>RECIPE EXPLORER</span></div><span className="recipe-note">MISE EN PLACE LIBRARY</span><span className="recipe-index">KITCHEN STUDY / 06</span></header>
      <section className="recipe-intro"><div><h1>Cook what the<br /><em>pantry can carry.</em></h1><p>Choose a dish, make the ingredient rhythm visible, and find one useful swap before the heat goes on.</p></div><div className="pantry-tag"><span>ON THE SHELF</span><strong>{recipe.code}</strong><small>synthetic recipes<br />not nutrition advice</small></div></section>
      <section className="recipe-workbench" aria-label="Recipe preparation desk"><aside className="dish-rail"><div className="dish-heading"><span>DISH INDEX</span><b>{recipes.length} RECIPES</b></div>{recipes.map((item) => <button key={item.id} type="button" className={item.id === recipe.id ? "dish-row is-active" : "dish-row"} onClick={() => chooseRecipe(item.id)} aria-pressed={item.id === recipe.id}><span>{item.code}</span><strong>{item.name}</strong><small>{item.origin} / {item.time}</small></button>)}<div className="dish-foot"><span>HOUSE NOTE</span><p>Good prep is a promise to your future self: the next move should already be waiting.</p></div></aside>
        <div className="recipe-board"><div className="board-heading"><div><span>RECIPE / {recipe.code}</span><h2>{recipe.name}</h2><p>{recipe.origin}</p></div><div className="board-meta"><strong>{recipe.time}</strong><small>{recipe.servings}</small></div></div><div className="mise-layout"><div className="ingredient-ledger"><div className="ledger-heading"><span>INGREDIENT LEDGER</span><span>{recipe.ingredients.length} ITEMS</span></div>{recipe.ingredients.map((ingredient) => <div className="ingredient-line" key={ingredient.name}><span className="ingredient-tick" /><strong>{ingredientName(ingredient, pantrySwap)}</strong><small>{ingredient.amount}</small></div>)}<button type="button" className={pantrySwap ? "swap-button is-on" : "swap-button"} onClick={() => setPantrySwap((value) => !value)}>{pantrySwap ? `Pantry swaps on (${swapCount(recipe)})` : `Show ${swapCount(recipe)} pantry swaps`}</button></div><div className="prep-rail"><div className="ledger-heading"><span>PREP SEQUENCE</span><span>{stepCounter(stepIndex, recipe.steps.length)}</span></div>{recipe.steps.map((item, index) => <button key={item.label} type="button" className={index === stepIndex ? "prep-step is-active" : "prep-step"} onClick={() => setStepIndex(index)} aria-pressed={index === stepIndex}><span>{index === stepIndex ? "NOW" : String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong></button>)}<div className="prep-note"><span>AT THE BOARD</span><h3>{step.label}</h3><p>{prepNote(recipe, stepIndex, pantrySwap)}</p></div></div></div><div className="recipe-footnote"><span>COOKING LOGIC</span><p>The board keeps ingredients and sequence in the same field. This is an illustrative planning aid, not a medical or nutritional claim.</p></div></div></section>
      <footer className="recipe-footer"><span>BOOKCHAOWALIT / RECIPE EXPLORER</span><span>MISE EN PLACE LIBRARY · SYNTHETIC DATA</span></footer>
    </div></main>
  );
}
