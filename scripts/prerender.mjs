// Writes the page's real content into dist/index.html so Google sees it without running JavaScript.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { render } from "../dist-ssr/entry-server.js";

const html = readFileSync("dist/index.html", "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("prerender: root element not found");
writeFileSync("dist/index.html", html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
rmSync("dist-ssr", { recursive: true, force: true });
console.log("prerender: page content written into dist/index.html");
