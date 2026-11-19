import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/site";

describe("robots and sitemap", () => {
  it("live on the site's own domain and keep /api/ out of the index", () => {
    expect(SITE_URL).toBe("https://recipe.bookchaowalit.com");
    expect(sitemap().map((entry) => entry.url)).toEqual(["https://recipe.bookchaowalit.com", "https://recipe.bookchaowalit.com/recipes/tomato-rice", "https://recipe.bookchaowalit.com/recipes/miso-noodles", "https://recipe.bookchaowalit.com/recipes/coconut-lentils"]);
    expect(robots().sitemap).toBe("https://recipe.bookchaowalit.com/sitemap.xml");
    expect(JSON.stringify(robots().rules)).toContain("/api/");
  });
});
