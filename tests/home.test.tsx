import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import RecipeRoute, { generateMetadata, generateStaticParams } from "@/app/recipes/[id]/page";

describe("recipe index", () => {
  it("lists every recipe as a card that links to its page, with a useful count instead of codes", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Cook what the pantry can carry.");
    expect(html).toContain("3 recipes · 18–44 min");
    for (const [id, name] of [["tomato-rice", "Tomato rice with greens"], ["miso-noodles", "Miso noodles with lime"], ["coconut-lentils", "Coconut lentils"]]) {
      expect(html).toContain(`href="/recipes/${id}"`);
      expect(html).toContain(name);
    }
    expect(html).toContain("4 ingredients, 3 steps, 2 pantry swaps.");
    expect(html).not.toContain("KITCHEN STUDY");
    expect(html).toContain("not nutrition or medical advice");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("recipe page", () => {
  it("pre-renders one page per recipe with its own title and canonical", async () => {
    expect(generateStaticParams()).toEqual([{ id: "tomato-rice" }, { id: "miso-noodles" }, { id: "coconut-lentils" }]);
    const meta = await generateMetadata({ params: Promise.resolve({ id: "miso-noodles" }) });
    expect(meta.title).toBe("Miso noodles with lime | Recipe Explorer");
    expect(meta.alternates?.canonical).toBe("/recipes/miso-noodles");
    expect(await generateMetadata({ params: Promise.resolve({ id: "nope" }) })).toEqual({});
  });

  it("renders ingredients, the method, the swap toggle and previous/next links", async () => {
    const html = renderToString(await RecipeRoute({ params: Promise.resolve({ id: "miso-noodles" }) }));
    expect(html).toContain("<h1>Miso noodles with lime</h1>");
    expect(html).toContain("Use 2 pantry swaps");
    expect(html).toContain("Loosen miso with hot noodle water.");
    expect(html).toContain('href="/recipes/tomato-rice"');
    expect(html).toContain('href="/recipes/coconut-lentils"');
    expect(html).toContain("← <!-- -->All recipes");
  });

  it("answers 404 for an unknown recipe", async () => {
    await expect(RecipeRoute({ params: Promise.resolve({ id: "nope" }) })).rejects.toThrow();
  });
});
