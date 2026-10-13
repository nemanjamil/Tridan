# Tridan

Static site for https://tridan.rs. Sources live in `site/`; `npm run build` (plain Node, no
dependencies) writes the HTML pages, `/assets`, `sitemap.xml`, `robots.txt` and `llms.txt` into
the repository root, which is the Apache docroot. Commit the generated files together with the
sources. Never edit generated HTML by hand.

- Copy: `site/content/sr.mjs` (root, Serbian) and `site/content/en.mjs` (`/en/`).
- Facts, routes, GA4 ID: `site/config.mjs`. Layout, head tags, JSON-LD: `site/build.mjs`.
- CSS/JS: `site/assets/` (fingerprinted with `?v=<hash>`). Fonts and images: `site/static/`.
- The build fails on em/en dashes, titles over 60 chars, descriptions outside 70 to 160 chars
  and FAQ answers outside 50 to 100 words.
- `.htaccess` is hand-maintained (not generated). It needs `AllowOverride FileInfo` (or `All`).
