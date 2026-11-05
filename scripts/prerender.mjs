// Writes each page's real content into its HTML so Google sees it without running JavaScript.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { renderHome, renderPromo } from "../dist-ssr/entry-server.js";

for (const [file, render] of [
  ["dist/index.html", renderHome],
  ["dist/paripulse-promo-code/index.html", renderPromo],
]) {
  const html = readFileSync(file, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error(`prerender: root element not found in ${file}`);
  writeFileSync(file, html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
  console.log(`prerender: ${file}`);
}
rmSync("dist-ssr", { recursive: true, force: true });
