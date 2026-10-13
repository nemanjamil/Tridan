#!/usr/bin/env node
// Static site build for tridan.rs. No dependencies: `node site/build.mjs`.
//
// Sources: site/config.mjs (facts + routes), site/content/{sr,en}.mjs (copy),
//          site/assets/* (css/js, fingerprinted by query string), site/static/** (copied as is).
// Output:  the repository root (= Apache docroot): <route>/index.html per language, 404 pages,
//          /assets/*, sitemap.xml, robots.txt, llms.txt.
// The build fails on: em/en dashes in copy, title > 60, description outside 70..160,
// FAQ answers outside 50..100 words, duplicate titles/descriptions, missing h1.
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, SITE_NAME, LANGS, DEFAULT_LANG, OG_LOCALES, GA_ID, COMPANY, ECOSYSTEM, ROUTES, SERVICE_KEYS, route, pathOf, abs } from "./config.mjs";
import * as sr from "./content/sr.mjs";
import * as en from "./content/en.mjs";

const SITE_DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(SITE_DIR, "..");
const CONTENT = { sr, en };
const errors = [];
const generated = [];

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (html) => String(html).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => strip(s).split(/\s+/).filter(Boolean).length;
const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);

function lastmod() {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${relative(OUT, SITE_DIR)}"`, { cwd: OUT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (d) return d;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}
const LASTMOD = lastmod();
const YEAR = new Date().getFullYear();

function write(rel, content) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  generated.push(rel);
}

const fileFor = (path) => (path.endsWith("/") ? `${path.slice(1)}index.html` : path.slice(1));

// ---------------------------------------------------------------- assets
const ASSET_SRC = join(SITE_DIR, "assets");
const ASSETS = {};
for (const name of readdirSync(ASSET_SRC)) {
  const src = join(ASSET_SRC, name);
  ASSETS[name] = `/assets/${name}?v=${hash(src)}`;
  write(`assets/${name}`, readFileSync(src));
}
const STATIC_DIR = join(SITE_DIR, "static");
if (existsSync(STATIC_DIR)) cpSync(STATIC_DIR, OUT, { recursive: true });

const OG_IMAGE = { path: "/assets/img/og-tridan.png", width: 1200, height: 630 };
const LOGO_IMAGE = { path: "/assets/img/logo-512.png", width: 512, height: 512 };

// ---------------------------------------------------------------- icons
const ICON = {
  webApps: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12"/>',
  integrations: '<path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0V7zM12 16v5"/>',
  devops: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78A6 6 0 0 0 4.5 12.5 3.5 3.5 0 0 0 6.5 19h11z"/>',
  ai: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM18.5 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z"/>',
};
// Project icons (Lucide-style strokes), keyed by `icon` on h3 blocks in the content files.
Object.assign(ICON, {
  face: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  pipeline: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="12" r="2.5"/><path d="M6 8.5v7M8.3 7.2c4.2.6 7 2 7.4 3.4"/>',
  payment: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
  campaign: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  blockchain: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h3.5a2 2 0 0 1 2 2V14M14 17.5h-3.5a2 2 0 0 1-2-2V10"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
});
const icon = (key) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[key] || ""}</svg>`;
const LOGO_MARK =
  '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#0b1220" stroke="#22d3ee" stroke-width="2"/><path d="M9 10.5h14M16 10.5V23" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round"/><path d="M20 23l3.5-5 3.5 5z" fill="#22d3ee" transform="translate(-2 -1)"/></svg>';

const CLIENTS = [ // names only (owner: no links, no logos)
  ["Coca-Cola"],
  ["VIBE"],
  ["ICO-cert"],
  ["Blokaria"],
  ["Billboard"],
  ["Nature Plant"],
];

// Technologies named in the service copy (devops/integrations pages), shown under the home hero.
const STACK = ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "Prometheus", "Grafana", "Cardano", "Avalanche"];

// ---------------------------------------------------------------- lint
const DASH = /[–—]/;
function walkStrings(obj, path, fn) {
  if (typeof obj === "string") return fn(obj, path);
  if (Array.isArray(obj)) return obj.forEach((v, i) => walkStrings(v, `${path}[${i}]`, fn));
  if (obj && typeof obj === "object") for (const [k, v] of Object.entries(obj)) walkStrings(v, `${path}.${k}`, fn);
}
for (const lang of LANGS) {
  const { ui, pages } = CONTENT[lang];
  walkStrings({ ui, pages }, lang, (s, path) => {
    if (DASH.test(s)) errors.push(`${path}: contains an em/en dash`);
  });
  for (const r of ROUTES) {
    const pg = pages[r.key];
    if (!pg) {
      errors.push(`${lang}.${r.key}: missing page content`);
      continue;
    }
    for (const f of ["title", "description", "h1", "lead"]) if (!pg[f]) errors.push(`${lang}.${r.key}: missing ${f}`);
    if (pg.title.length > 60) errors.push(`${lang}.${r.key}: title ${pg.title.length} chars > 60`);
    if (pg.description.length < 70 || pg.description.length > 160) errors.push(`${lang}.${r.key}: description ${pg.description.length} chars (70..160)`);
    if (words(pg.lead) < 35 || words(pg.lead) > 70) errors.push(`${lang}.${r.key}: lead ${words(pg.lead)} words (35..70)`);
    for (const [i, f] of (pg.faq || []).entries()) {
      const n = words(f.a);
      if (n < 50 || n > 100) errors.push(`${lang}.${r.key}.faq[${i}]: ${n} words (50..100)`);
    }
  }
  const nf = ui.notFound;
  if (nf.title.length > 60 || nf.description.length < 70 || nf.description.length > 160) errors.push(`${lang}.404: title/description length`);
  const titles = ROUTES.map((r) => pages[r.key]?.title);
  const descs = ROUTES.map((r) => pages[r.key]?.description);
  if (new Set(titles).size !== titles.length) errors.push(`${lang}: duplicate titles`);
  if (new Set(descs).size !== descs.length) errors.push(`${lang}: duplicate descriptions`);
}

// ---------------------------------------------------------------- JSON-LD
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#founder`;
const LANG_NAMES = { sr: "Serbian", en: "English" };

function organization(lang) {
  const { pages } = CONTENT[lang];
  const a = COMPANY.address;
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", "@id": `${SITE_URL}/#logo`, url: abs(LOGO_IMAGE.path), width: LOGO_IMAGE.width, height: LOGO_IMAGE.height },
    image: abs(OG_IMAGE.path),
    description: pages.home.description,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.locality,
      addressCountry: a.country,
    },
    identifier: { "@type": "PropertyValue", propertyID: "Matični broj (MB)", value: COMPANY.registrationNumber },
    taxID: COMPANY.taxId,
    vatID: COMPANY.taxId,
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: COMPANY.email, availableLanguage: LANGS.map((l) => LANG_NAMES[l]) },
    areaServed: [{ "@type": "Country", name: "Serbia" }, "Europe"],
    founder: { "@id": FOUNDER_ID },
    knowsAbout: ["Custom software development", "Full-stack web application development", "API development and system integration", "Payment gateway integration", "DevOps and CI/CD", "Cloud infrastructure on AWS, Azure and Google Cloud", "Infrastructure as code", "AI integration"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: pages.services.h1,
      itemListElement: SERVICE_KEYS.map((k) => ({ "@type": "Offer", itemOffered: { "@id": `${abs(pathOf(k, lang))}#service` } })),
    },
  };
}

function founder(lang) {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: COMPANY.founder.name,
    alternateName: COMPANY.founder.displayName.sr,
    jobTitle: CONTENT[lang].ui.founderJob,
    worksFor: { "@id": ORG_ID },
    affiliation: [
      { "@type": "Organization", name: ECOSYSTEM.ai.name, url: ECOSYSTEM.ai.schemaUrl },
      { "@type": "Organization", name: ECOSYSTEM.academy.name, url: ECOSYSTEM.academy.schemaUrl },
    ],
    sameAs: [COMPANY.founder.linkedin, COMPANY.founder.youtube],
  };
}

function breadcrumbTrail(key, lang) {
  const trail = [];
  let r = route(key);
  while (r) {
    trail.unshift(r);
    r = r.parent ? route(r.parent) : null;
  }
  const { ui, pages } = CONTENT[lang];
  return trail.map((t) => ({ key: t.key, name: t.key === "home" ? ui.breadcrumbHome : pages[t.key].breadcrumb || pages[t.key].h1, path: t[lang] }));
}

function graph(key, lang) {
  const pg = CONTENT[lang].pages[key];
  const url = abs(pathOf(key, lang));
  const pageType = { about: "AboutPage", contact: "ContactPage", projects: "CollectionPage" }[key] || "WebPage";
  const nodes = [
    organization(lang),
    founder(lang),
    { "@type": "WebSite", "@id": WEBSITE_ID, name: SITE_NAME, url: abs(pathOf("home", lang)), inLanguage: LANGS, publisher: { "@id": ORG_ID } },
  ];
  const webPage = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: pg.title,
    description: pg.description,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: abs(OG_IMAGE.path) },
    dateModified: LASTMOD,
  };
  if (key !== "home") {
    webPage.breadcrumb = { "@id": `${url}#breadcrumb` };
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbTrail(key, lang).map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: abs(b.path) })),
    });
  }
  if (pg.service) {
    webPage.mainEntity = { "@id": `${url}#service` };
    nodes.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: pg.service.name,
      serviceType: pg.service.type,
      description: strip(pg.lead),
      url,
      inLanguage: lang,
      provider: { "@id": ORG_ID },
      areaServed: [{ "@type": "Country", name: "Serbia" }, "Europe"],
    });
  }
  if (key === "services") {
    webPage.mainEntity = {
      "@type": "ItemList",
      itemListElement: SERVICE_KEYS.map((k, i) => ({ "@type": "ListItem", position: i + 1, name: CONTENT[lang].pages[k].h1, url: abs(pathOf(k, lang)) })),
    };
  }
  if (pg.faq?.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      inLanguage: lang,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntity: pg.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: strip(f.a) } })),
    });
  }
  nodes.push(webPage);
  return { "@context": "https://schema.org", "@graph": nodes };
}

// ---------------------------------------------------------------- page parts
function head({ lang, title, description, path, alternates, noindex, ld }) {
  const url = path ? abs(path) : null;
  const other = LANGS.filter((l) => l !== lang);
  return `<!doctype html>
<html lang="${lang}" data-ga="${GA_ID}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Google tag (gtag.js), Consent Mode v2 advanced: cookies stay off until the visitor accepts -->
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function(){var a="denied";try{var c=JSON.parse(localStorage.getItem("tridan-consent")||"null");if(c&&c.v===1&&c.analytics===true)a="granted";}catch(e){}
gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:a,functionality_storage:"denied",personalization_storage:"denied",security_storage:"granted",wait_for_update:500});})();
gtag("js", new Date());
gtag("config", "${GA_ID}");
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
${url ? `<link rel="canonical" href="${url}">` : ""}
${(alternates || []).map(([hl, href]) => `<link rel="alternate" hreflang="${hl}" href="${href}">`).join("\n")}
<meta name="theme-color" content="#05080f">
<meta name="author" content="${esc(SITE_NAME)}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ASSETS["site.css"]}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${url ? `<meta property="og:url" content="${url}">` : ""}
<meta property="og:image" content="${abs(OG_IMAGE.path)}">
<meta property="og:image:width" content="${OG_IMAGE.width}">
<meta property="og:image:height" content="${OG_IMAGE.height}">
<meta property="og:image:alt" content="Tridan: razvoj softvera po meri / custom software development">
<meta property="og:locale" content="${OG_LOCALES[lang]}">
${other.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALES[l]}">`).join("\n")}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(OG_IMAGE.path)}">
${ld ? `<script type="application/ld+json">${jsonLd(ld)}</script>` : ""}
<script src="${ASSETS["site.js"]}" defer></script>
</head>`.replace(/\n{2,}/g, "\n");
}

function header(lang, key, otherHref) {
  const { ui } = CONTENT[lang];
  const current = key ? breadcrumbTrail(key, lang).map((b) => b.key) : [];
  const items = ui.nav
    .map(([k, label]) => {
      const cur = key === k ? ' aria-current="page"' : current.includes(k) ? ' aria-current="true"' : "";
      return `<li><a href="${pathOf(k, lang)}"${cur}${k === "contact" ? ' class="nav-cta"' : ""}>${esc(label)}</a></li>`;
    })
    .join("");
  const other = LANGS.find((l) => l !== lang);
  return `<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="site-header">
<div class="container header-inner">
<a class="brand" href="${pathOf("home", lang)}" aria-label="Tridan, ${esc(ui.breadcrumbHome)}">${LOGO_MARK}<span>TRIDAN</span></a>
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><span class="bars" aria-hidden="true"></span>${esc(ui.menu)}</button>
<nav id="site-nav" class="site-nav" aria-label="${lang === "sr" ? "Glavni meni" : "Main menu"}">
<ul>${items}<li class="nav-lang"><a class="lang" href="${otherHref}" hreflang="${other}" lang="${other}" title="${esc(ui.langSwitch.title)}">${esc(ui.langSwitch.label)}</a></li></ul>
</nav>
</div>
</header>`;
}

function footer(lang) {
  const { ui, pages } = CONTENT[lang];
  const f = ui.footer;
  const svc = SERVICE_KEYS.map((k) => `<li><a href="${pathOf(k, lang)}">${esc(pages[k].breadcrumb)}</a></li>`).join("");
  const eco = f.ecosystemItems.map(([k, name, offer]) => `<li><a href="${ECOSYSTEM[k].url[lang]}"><strong>${esc(name)}</strong>: ${esc(offer)}</a></li>`).join("");
  const fn = COMPANY.founder;
  return `<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div>
<a class="brand" href="${pathOf("home", lang)}">${LOGO_MARK}<span>TRIDAN</span></a>
<p class="footer-tagline">${esc(f.tagline)}</p>
<p><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></p>
</div>
<div>
<p class="footer-title">${esc(f.services)}</p>
<ul><li><a href="${pathOf("services", lang)}">${esc(pages.services.breadcrumb)}</a></li>${svc}</ul>
</div>
<div>
<p class="footer-title">${esc(f.company)}</p>
<ul>
<li><a href="${pathOf("projects", lang)}">${esc(pages.projects.breadcrumb)}</a></li>
<li><a href="${pathOf("about", lang)}">${esc(pages.about.breadcrumb)}</a></li>
<li><a href="${pathOf("contact", lang)}">${esc(pages.contact.breadcrumb)}</a></li>
<li><a href="${pathOf("privacy", lang)}">${esc(f.privacy)}</a></li>
<li><button type="button" class="linklike" data-cookie-settings>${esc(f.cookieSettings)}</button></li>
</ul>
</div>
<div class="eco">
<p class="footer-title">${esc(f.ecosystem)}</p>
<ul>${eco}</ul>
<p class="founder">${esc(f.founderLabel)}: <a href="${fn.linkedin}">${esc(fn.displayName[lang])}</a> · <a href="${fn.youtube}">YouTube</a></p>
</div>
</div>
<div class="footer-legal">
<p>${esc(f.legal)}</p>
<p>© ${YEAR} ${SITE_NAME}</p>
</div>
</div>
<div class="footer-mark" aria-hidden="true">TRIDAN</div>
</footer>`;
}

function cookieBanner(lang) {
  const c = CONTENT[lang].ui.cookie;
  return `<div id="cookie-banner" class="cookie-banner" role="region" aria-label="${esc(c.label)}" data-nirmata-ignore hidden>
<p>${esc(c.text)} <a href="${pathOf("privacy", lang)}">${esc(c.link)}</a></p>
<div class="cookie-actions">
<button type="button" class="btn" data-consent="reject">${esc(c.reject)}</button>
<button type="button" class="btn primary" data-consent="accept">${esc(c.accept)}</button>
</div>
</div>`;
}

const mailto = (lang) => `mailto:${COMPANY.email}?subject=${encodeURIComponent(CONTENT[lang].ui.mailSubject)}`;

// ---------------------------------------------------------------- blocks
// `reveal(i)` marks an element for the scroll reveal in site.js (stagger index i).
const reveal = (i = 0) => ` data-reveal style="--i:${i}"`;

// Decorative mini illustrations for the bento service cards (aria-hidden, pure CSS/SVG).
function bentoArt(key) {
  const art = {
    webApps: `<div class="art art-web"><div class="aw-bar"><i></i><i></i><i></i><span></span></div><div class="aw-body"><div class="aw-side"><b></b><b></b><b></b><b></b></div><div class="aw-main"><div class="aw-kpis"><b></b><b></b><b></b></div><svg viewBox="0 0 240 70" preserveAspectRatio="none"><path class="aw-area" d="M0 60 C30 52 45 30 75 34 S120 58 150 38 205 12 240 18 V70 H0Z"/><path class="aw-line" d="M0 60 C30 52 45 30 75 34 S120 58 150 38 205 12 240 18"/></svg></div></div></div>`,
    integrations: `<div class="art art-int"><span class="ai-node a">${icon("webApps")}</span><svg viewBox="0 0 200 80" preserveAspectRatio="none"><path class="ai-wire" d="M0 20 C70 20 130 60 200 60"/><path class="ai-wire" d="M0 60 C70 60 130 20 200 20"/><path pathLength="100" class="ai-flow" d="M0 20 C70 20 130 60 200 60"/><path pathLength="100" class="ai-flow b" d="M0 60 C70 60 130 20 200 20"/></svg><span class="ai-node b">${icon("payment")}</span></div>`,
    devops: `<div class="art art-ops"><span class="ao-step">${icon("check")}<i>build</i></span><span class="ao-step">${icon("check")}<i>test</i></span><span class="ao-step live">${icon("devops")}<i>deploy</i></span></div>`,
    ai: `<div class="art art-ai"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="core">${icon("ai")}</span></div>`,
  };
  return art[key] || "";
}

function renderBlock(b, lang) {
  if (b.p) return `<p>${b.p}</p>`;
  if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
  if (b.list)
    return `<ul class="list" role="list">${b.list.map((li) => `<li><span class="tick">${icon("check")}</span><span>${li}</span></li>`).join("")}</ul>`;
  if (b.steps)
    return `<ol class="steps">${b.steps
      .map((s, i) => `<li${reveal(i)}><span class="step-node" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><strong>${esc(s.title)}</strong><span>${esc(s.text)}</span></li>`)
      .join("")}</ol>`;
  if (b.cards) {
    const keyOf = (href) => SERVICE_KEYS.find((k) => pathOf(k, lang) === href);
    return `<ul class="bento" role="list">${b.cards
      .map((c, i) => {
        const k = keyOf(c.href);
        return `<li class="card glow-card card-${k}"${reveal(i)}><span class="glow" aria-hidden="true"></span><div class="card-art" aria-hidden="true">${bentoArt(k)}</div><div class="card-body"><div class="card-icon">${icon(k)}</div><h3><a href="${c.href}">${esc(c.title)}</a></h3><p>${esc(c.text)}</p><span class="more" aria-hidden="true">${esc(CONTENT[lang].ui.readMore)} ${icon("arrow")}</span></div></li>`;
      })
      .join("")}</ul>`;
  }
  if (b.clients)
    return `<ul class="clients" role="list">${CLIENTS.map(([n], i) => `<li${reveal(i)}>${esc(n)}</li>`).join("")}</ul>`;
  if (b.legal) {
    const L = CONTENT[lang].ui.legalLabels;
    const a = COMPANY.address;
    return `<dl class="legal">
<dt>${esc(L.name)}</dt><dd>${esc(COMPANY.legalName)}</dd>
<dt>${esc(L.mb)}</dt><dd>${COMPANY.registrationNumber}</dd>
<dt>${esc(L.pib)}</dt><dd>${COMPANY.taxId}</dd>
<dt>${esc(L.address)}</dt><dd>${esc(`${a.street}, ${a.postalCode} ${a.locality}, ${a.countryName[lang]}`)}</dd>
<dt>${esc(L.email)}</dt><dd><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></dd>
</dl>`;
  }
  throw new Error(`unknown block ${JSON.stringify(b)}`);
}

// h3 + following paragraphs become project cards.
function renderProjects(blocks, lang) {
  const groups = [];
  for (const b of blocks) {
    if (b.h3) groups.push({ h3: b.h3, icon: b.icon, body: [] });
    else groups[groups.length - 1].body.push(b);
  }
  return `<div class="projects">${groups
    .map(
      (g, i) =>
        `<article class="project glow-card"${reveal(i)}><span class="glow" aria-hidden="true"></span><div class="project-top"><span class="card-icon">${icon(g.icon)}</span><span class="project-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span></div><h3>${esc(g.h3)}</h3>${g.body.map((b) => renderBlock(b, lang)).join("")}</article>`
    )
    .join("")}</div>`;
}

const slug = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "dj").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Section layout is derived from the blocks: "wide" blocks (cards, steps, project h3s, clients)
// get a stacked layout with the heading on top; text-only sections get a two-column split.
function renderSection(s, i, lang) {
  const id = slug(s.h2);
  const num = `<span class="sec-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>`;
  const isWide = (b) => b.cards || b.steps || b.h3 || b.clients;
  const firstWide = s.blocks.findIndex(isWide);
  if (firstWide === -1) {
    const legal = s.blocks.some((b) => b.legal) ? " sec-legal" : "";
    return `<section class="section sec-split${legal}" aria-labelledby="${id}"><div class="container split"><div class="sec-head"${reveal()}>${num}<h2 id="${id}">${esc(s.h2)}</h2></div><div class="prose"${reveal(1)}>${s.blocks.map((b) => renderBlock(b, lang)).join("\n")}</div></div></section>`;
  }
  const intro = s.blocks.slice(0, firstWide);
  const rest = s.blocks.slice(firstWide);
  const body = rest.some((b) => b.h3) ? renderProjects(rest, lang) : rest.map((b) => renderBlock(b, lang)).join("\n");
  const kind = rest.some((b) => b.cards) ? "sec-bento" : rest.some((b) => b.steps) ? "sec-process" : rest.some((b) => b.clients) ? "sec-clients" : "sec-projects";
  return `<section class="section ${kind}" aria-labelledby="${id}"><div class="container"><div class="sec-head stacked"${reveal()}>${num}<h2 id="${id}">${esc(s.h2)}</h2>${intro.map((b) => renderBlock(b, lang)).join("")}</div>${body}</div></section>`;
}

function heroCtas(pg, lang) {
  if (!pg.heroCtas) return "";
  return `<div class="cta-row">${pg.heroCtas
    .map((c) => {
      const href = c.mail ? mailto(lang) : c.href;
      const attrs = c.contact ? " data-contact" : "";
      return `<a class="btn${c.primary ? " primary" : ""}" href="${href}"${attrs}>${esc(c.label)}${c.primary ? icon("arrow") : ""}</a>`;
    })
    .join("")}</div>`;
}

// Hero background: grid lines, a cursor-following glow (site.js sets --mx/--my) and a few
// pulsing cells (adapted from 21st.dev "DataGridHero"), plus two slow aurora blobs.
const PULSE_CELLS = [[14, 2], [17, 4], [20, 1], [22, 5], [19, 8], [24, 3], [15, 9], [23, 7]];
const heroBg = () =>
  `<div class="hero-bg" aria-hidden="true"><span class="aurora a1"></span><span class="aurora a2"></span><span class="grid-lines"></span><span class="grid-glow"></span>${PULSE_CELLS.map(([x, y], i) => `<i class="cell" style="--x:${x};--y:${y};--d:${(i * 0.7) % 4}s"></i>`).join("")}</div>`;

// Home hero visual: the four services orbiting the Tridan core, plus a small deploy log.
function heroVisual(lang) {
  const nodes = [
    ["webApps", "Web", "n1"],
    ["integrations", "API", "n2"],
    ["devops", "Cloud", "n3"],
    ["ai", "AI", "n4"],
  ];
  return `<div class="hero-visual" aria-hidden="true"><div class="hv-stage"><svg class="hv-lines" viewBox="0 0 400 400" fill="none"><circle cx="200" cy="200" r="150" class="hv-orbit"/><circle cx="200" cy="200" r="96" class="hv-orbit inner"/><path class="hv-path" d="M200 200 C150 200 120 150 92 110"/><path class="hv-path" d="M200 200 C250 200 280 150 308 110"/><path class="hv-path" d="M200 200 C150 200 120 250 92 290"/><path class="hv-path" d="M200 200 C250 200 280 250 308 290"/><path pathLength="100" class="hv-flow" d="M200 200 C150 200 120 150 92 110"/><path pathLength="100" class="hv-flow f2" d="M200 200 C250 200 280 150 308 110"/><path pathLength="100" class="hv-flow f3" d="M200 200 C150 200 120 250 92 290"/><path pathLength="100" class="hv-flow f4" d="M200 200 C250 200 280 250 308 290"/></svg><div class="hv-core">${LOGO_MARK}</div>${nodes
    .map(([k, label, cls]) => `<div class="hv-node ${cls}">${icon(k)}<span>${label}</span></div>`)
    .join("")}<div class="hv-term"><div class="hv-term-bar"><i></i><i></i><i></i></div><code><b>$</b> git push origin main</code><code class="ok">${icon("check")} tests passed</code><code class="ok">${icon("check")} deployed</code></div></div></div>`;
}

// Service pages: the service icon as a glowing tile on the right of the hero.
// Services overview shows all four icons; projects/about/contact show the Tridan mark.
const serviceVisual = (key) => {
  const inner =
    key === "services"
      ? `<span class="svc-tile quad">${SERVICE_KEYS.map((k) => icon(k)).join("")}</span>`
      : `<span class="svc-tile${SERVICE_KEYS.includes(key) ? "" : " mark"}">${SERVICE_KEYS.includes(key) ? icon(key) : LOGO_MARK}</span>`;
  return `<div class="svc-visual" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span>${inner}</div>`;
};

function stackStrip(lang) {
  const { ui } = CONTENT[lang];
  return `<div class="stack"><p class="stack-label">${esc(ui.stackLabel)}</p><ul class="stack-list" role="list">${STACK.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
}

function renderPage(key, lang) {
  const { ui, pages } = CONTENT[lang];
  const pg = pages[key];
  const path = pathOf(key, lang);
  const alternates = [...LANGS.map((l) => [l, abs(pathOf(key, l))]), ["x-default", abs(pathOf(key, DEFAULT_LANG))]];
  const other = LANGS.find((l) => l !== lang);
  const crumbs =
    key === "home"
      ? ""
      : `<nav class="breadcrumbs" aria-label="${lang === "sr" ? "Putanja" : "Breadcrumb"}"><ol>${breadcrumbTrail(key, lang)
          .map((b, i, arr) => (i === arr.length - 1 ? `<li><span aria-current="page">${esc(b.name)}</span></li>` : `<li><a href="${b.path}">${esc(b.name)}</a></li>`))
          .join("")}</ol></nav>`;
  const sections = pg.sections.map((s, i) => renderSection(s, i, lang)).join("\n");
  const faq = pg.faq?.length
    ? `<section class="section faq sec-split" aria-labelledby="faq"><div class="container split"><div class="sec-head"${reveal()}><span class="sec-num" aria-hidden="true">FAQ</span><h2 id="faq">${esc(ui.faqHeading)}</h2></div><div class="faq-list">${pg.faq
        .map((f, i) => `<details${reveal(i)}><summary><span>${esc(f.q)}</span><span class="chev" aria-hidden="true"></span></summary><div class="faq-a"><p>${f.a}</p></div></details>`)
        .join("\n")}</div></div></section>`
    : "";
  const cta =
    key === "contact" || key === "privacy"
      ? ""
      : `<section class="cta-band" aria-labelledby="cta"><div class="container"><div class="cta-panel"${reveal()}><div class="cta-bg" aria-hidden="true"></div><h2 id="cta">${esc(ui.ctaTitle)}</h2><p>${esc(ui.ctaText)}</p><div class="cta-row"><a class="btn primary" href="${mailto(lang)}">${esc(ui.ctaButton)}: ${COMPANY.email}</a><a class="btn" href="${pathOf("contact", lang)}" data-contact>${esc(ui.ctaSecondary)}</a></div></div></div></section>`;
  const isHome = key === "home";
  const eyebrow = isHome ? `<span class="eyebrow"><span class="dot" aria-hidden="true"></span>${lang === "sr" ? "Agencija za razvoj softvera · Beograd" : "Software development agency · Belgrade"}</span>` : "";
  const updated = pg.lastUpdated ? `<p class="updated">${esc(ui.lastUpdated)}: ${esc(pg.lastUpdated)}</p>` : "";
  const visual = isHome ? heroVisual(lang) : ["privacy"].includes(key) ? "" : serviceVisual(key);
  const heroCls = `hero${isHome ? " hero-home" : " compact"}${visual ? " has-visual" : ""}`;
  const html = `${head({ lang, title: pg.title, description: pg.description, path, alternates, ld: graph(key, lang) })}
<body>
${header(lang, key, pathOf(key, other))}
<main id="main">
<div class="${heroCls}">${heroBg()}<div class="container hero-inner"><div class="hero-copy">${crumbs}${eyebrow}<h1>${esc(pg.h1)}</h1><p class="lead">${pg.lead}</p>${updated}${heroCtas(pg, lang)}</div>${visual}</div>${isHome ? `<div class="container">${stackStrip(lang)}</div>` : ""}</div>
${sections}
${faq}
${cta}
</main>
${footer(lang)}
${cookieBanner(lang)}
</body>
</html>
`;
  write(fileFor(path), html);
}

function render404(lang) {
  const { ui, pages } = CONTENT[lang];
  const nf = ui.notFound;
  const other = LANGS.find((l) => l !== lang);
  const links = ["home", "services", "projects", "contact"]
    .map((k) => `<li><span class="tick">${icon("arrow")}</span><a href="${pathOf(k, lang)}">${esc(k === "home" ? ui.breadcrumbHome : pages[k].breadcrumb)}</a></li>`)
    .join("");
  const html = `${head({ lang, title: nf.title, description: nf.description, noindex: true })}
<body>
${header(lang, null, pathOf("home", other))}
<main id="main">
<div class="hero compact">${heroBg()}<div class="container hero-inner"><div class="hero-copy"><span class="eyebrow"><span class="dot" aria-hidden="true"></span>404</span><h1>${esc(nf.h1)}</h1><p class="lead">${esc(nf.text)}</p></div></div></div>
<section class="section"><div class="container prose"><ul class="list" role="list">${links}</ul><p><a href="${pathOf("home", other)}" hreflang="${other}" lang="${other}">${esc(nf.other)}</a></p></div></section>
</main>
${footer(lang)}
${cookieBanner(lang)}
</body>
</html>
`;
  write(lang === DEFAULT_LANG ? "404.html" : `${lang}/404.html`, html);
}

// ---------------------------------------------------------------- site docs
function sitemap() {
  const urls = ROUTES.flatMap((r) =>
    LANGS.map(
      (lang) => `  <url>
    <loc>${abs(r[lang])}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>${r.priority}</priority>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(r[l])}"/>`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(r[DEFAULT_LANG])}"/>
  </url>`
    )
  );
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`
  );
}

function robots() {
  const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot", "meta-externalagent", "Amazonbot", "DuckAssistBot", "MistralAI-User"];
  write(
    "robots.txt",
    `# robots.txt for ${SITE_URL} (generated by site/build.mjs)
# Search engines and AI assistants are welcome to read and cite this site.

User-agent: *
Allow: /

${AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`
  );
}

function llms() {
  const e = CONTENT.en.pages;
  const s = CONTENT.sr.pages;
  const a = COMPANY.address;
  const line = (key) => `- [${e[key].h1}](${abs(pathOf(key, "en"))}) / [${s[key].h1}](${abs(pathOf(key, "sr"))}): ${e[key].description}`;
  write(
    "llms.txt",
    `# Tridan

> Tridan is a custom software development agency in Belgrade, Serbia. It builds full-stack web applications, API integrations, DevOps and cloud infrastructure (AWS, Azure, Google Cloud) and AI integrations for companies in Serbia and abroad. The site is in Serbian (root) and English (/en/).

## Company facts

- Brand: Tridan
- Legal name: ${COMPANY.legalName}
- Registration number (MB): ${COMPANY.registrationNumber}
- Tax ID (PIB): ${COMPANY.taxId}
- Address: ${a.street}, ${a.postalCode} ${a.locality}, Serbia
- Email: ${COMPANY.email}
- Founder: ${COMPANY.founder.displayName.sr} (${COMPANY.founder.linkedin}, ${COMPANY.founder.youtube})
- Languages: Serbian, English
- Services: custom web application development; system integration and API development (including payment gateways); DevOps and cloud infrastructure; AI integration
- Past clients named on the site: ${CLIENTS.map(([n]) => n).join(", ")}
- Delivered work: online exam platforms with face analysis and fraud management; CI/CD on AWS and Azure; payment gateway integrations for UK and Irish companies; database migrations for global enterprises; Coca-Cola promotional giveaways; projects on the Cardano and Avalanche blockchains
- Training is not offered on this site; it is provided by Tridan Academy (${ECOSYSTEM.academy.schemaUrl}), a separate company. Ready-made AI agents for calls and chat: Tridan AI (${ECOSYSTEM.ai.schemaUrl}).

## Pages

${ROUTES.filter((r) => r.key !== "privacy").map((r) => line(r.key)).join("\n")}

## Optional

${line("privacy")}
- [Sitemap](${SITE_URL}/sitemap.xml)
`
  );
}

// ---------------------------------------------------------------- run
if (errors.length) {
  console.error(`Build failed, ${errors.length} content error(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
for (const lang of LANGS) {
  for (const r of ROUTES) renderPage(r.key, lang);
  render404(lang);
}
sitemap();
robots();
llms();
console.log(`Built ${generated.length} files into ${OUT} (lastmod ${LASTMOD}).`);
