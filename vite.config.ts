import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { ACCENT, BOOKMAKER, GOOGLE_SITE_VERIFICATION, LAST_UPDATED, PROMO_CODE, SITE_NAME, SITE_URL, THEME } from "./site.config.ts";

const gsc = process.env.GOOGLE_SITE_VERIFICATION || GOOGLE_SITE_VERIFICATION;
const siteUrl = (process.env.SITE_URL || SITE_URL).replace(/\/$/, "");

// Fills the page title/meta tags from site.config.ts and writes sitemap.xml + robots.txt.
function siteFiles(): Plugin {
  return {
    name: "site-files",
    transformIndexHtml: (html) => ({
      html: html
          .replaceAll("__SITE_URL__", siteUrl)
          .replaceAll("__SITE_NAME__", SITE_NAME)
          .replaceAll("__PROMO_CODE__", PROMO_CODE)
          .replaceAll("__BOOKMAKER__", BOOKMAKER)
          .replaceAll("__ACCENT__", ACCENT)
          .replaceAll("__YEAR__", String(new Date().getFullYear()))
          .replaceAll("__LAST_UPDATED__", LAST_UPDATED),
      tags: [
        {
          tag: "style",
          children: `:root{${Object.entries(THEME)
            .map(([k, val]) => `--color-${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${val}`)
            .join(";")}}`,
          injectTo: "head" as const,
        },
        ...(gsc
          ? [{ tag: "meta", attrs: { name: "google-site-verification", content: gsc }, injectTo: "head" as const }]
          : []),
      ],
    }),
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n  <url><loc>${siteUrl}/paripulse-promo-code/</loc><lastmod>${LAST_UPDATED}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteFiles()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        promo: fileURLToPath(new URL("./paripulse-promo-code/index.html", import.meta.url)),
      },
    },
  },
});
