import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the dish index, the first recipe board and the synthetic-data notices", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("pantry can carry.");
    for (const name of ["Tomato rice with greens", "Miso noodles with lime", "Coconut lentils"]) expect(html).toContain(name);
    expect(html).toContain("01 / 3");
    expect(html).toContain("Show 2 pantry swaps");
    expect(html).not.toContain("Find one pantry swap");
    expect(html).toContain("not nutrition advice");
    expect(html).toContain("SYNTHETIC DATA");
  });
});
