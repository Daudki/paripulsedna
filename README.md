# BonusDNA

Single-page affiliate site. No blog, no admin, no backend: just the page.

## Change things
Everything is in `site.config.ts`: site name, domain, promo code, affiliate link, accent colour.
After changing the name or code, also update the headline texts in `src/App.tsx` if you want different wording.

## Run
    npm install
    npm run dev

## Deploy on Vercel
Import the repo. Optionally add an environment variable `SITE_URL` (your domain, e.g. `https://example.com`).
The build writes `sitemap.xml` and `robots.txt` with that domain. Then add the domain in Google Search Console and submit `/sitemap.xml`.

## SEO and Google
Already done by the build: title, description, canonical, Open Graph and Twitter tags, `sitemap.xml`, `robots.txt`, and the page text written into the HTML so Google can read it without running JavaScript.

You still have to do (needs your domain and accounts):
1. The domain `bonusdna.com` is set in `site.config.ts`. In Vercel add `bonusdna.com` and `www.bonusdna.com` under Domains; `www` redirects to the main address (see `vercel.json`).
2. Google Search Console: add the property, verify it (DNS, or paste the HTML-tag code into `GOOGLE_SITE_VERIFICATION`), submit `https://bonusdna.com/sitemap.xml`, then use "Request indexing" on the home page.
3. Check the result with the URL Inspection tool in Search Console. Expect days to weeks before it ranks.

## Analytics
`<Analytics />` is already in `src/main.tsx`. In Vercel open the project > Analytics > Enable, then redeploy. Page views show up after the first visits.
The page also sends two custom events: `register_click` (with `place`: header, home, promotions, sports, casino, footer or floating-button) and `copy_promo_code`. Custom events need a Vercel plan that includes them (Pro). On the free plan only page views are counted.
