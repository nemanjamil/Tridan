// Site-wide facts and the route table. Pages contribute content (site/content/*.mjs);
// everything in <head>, the JSON-LD graph, sitemap.xml, robots.txt and llms.txt is
// generated from this file by site/build.mjs.

export const SITE_URL = "https://www.tridan.rs";
export const SITE_NAME = "Tridan";
export const LANGS = ["sr", "en"];
export const DEFAULT_LANG = "sr";
export const OG_LOCALES = { sr: "sr_RS", en: "en_US" };
export const GA_ID = "G-YK0XXSK7LM";

export const COMPANY = {
  brand: "Tridan",
  legalName: "TRIDAN DOO BEOGRAD (SAVSKI VENAC)",
  registrationNumber: "22337181", // MB (matični broj)
  taxId: "115999142", // PIB
  email: "office@tridan.rs",
  address: {
    street: "Koste Racina 24, stan 1",
    postalCode: "11040",
    locality: "Beograd-Savski Venac",
    localityEn: "Belgrade (Savski Venac)",
    country: "RS",
    countryName: { sr: "Srbija", en: "Serbia" },
  },
  founder: {
    name: "Nemanja Milivojevic",
    displayName: { sr: "Nemanja Milivojević", en: "Nemanja Milivojevic" },
    linkedin: "https://www.linkedin.com/in/nemanja-milivojevic/",
    youtube: "https://www.youtube.com/@NemanjaMilivojevic",
  },
};

// Other sites of the founder (spec: nirmata-sync/features/2026-10-13-tridan-ecosystem.md).
// Never put these in Organization sameAs / parentOrganization / subOrganization.
export const ECOSYSTEM = {
  ai: { name: "Tridan AI", url: { sr: "https://tridan-ai.com/sr", en: "https://tridan-ai.com/" }, schemaUrl: "https://tridan-ai.com" },
  academy: { name: "Tridan Academy", url: { sr: "https://tridan-academy.com/sr", en: "https://tridan-academy.com/en" }, schemaUrl: "https://tridan-academy.com" },
  imakohoce: { name: "imakohoce", url: { sr: "https://imakohoce.rs", en: "https://imakohoce.rs" }, schemaUrl: "https://imakohoce.rs" },
};

// key -> path per language. Order = sitemap / llms.txt order.
export const ROUTES = [
  { key: "home", sr: "/", en: "/en/", priority: "1.0" },
  { key: "services", sr: "/usluge/", en: "/en/services/", priority: "0.9", parent: "home" },
  { key: "webApps", sr: "/usluge/razvoj-web-aplikacija/", en: "/en/services/web-application-development/", priority: "0.8", parent: "services" },
  { key: "integrations", sr: "/usluge/integracije-i-api/", en: "/en/services/integrations-and-api/", priority: "0.8", parent: "services" },
  { key: "devops", sr: "/usluge/devops-i-cloud/", en: "/en/services/devops-and-cloud/", priority: "0.8", parent: "services" },
  { key: "ai", sr: "/usluge/ai-integracije/", en: "/en/services/ai-integration/", priority: "0.8", parent: "services" },
  { key: "projects", sr: "/projekti/", en: "/en/projects/", priority: "0.7", parent: "home" },
  { key: "about", sr: "/o-nama/", en: "/en/about/", priority: "0.6", parent: "home" },
  { key: "contact", sr: "/kontakt/", en: "/en/contact/", priority: "0.7", parent: "home" },
  { key: "privacy", sr: "/privatnost/", en: "/en/privacy/", priority: "0.2", parent: "home" },
];

export const SERVICE_KEYS = ["webApps", "integrations", "devops", "ai"];

export const route = (key) => ROUTES.find((r) => r.key === key);
export const pathOf = (key, lang) => route(key)[lang];
export const abs = (path) => SITE_URL + path;
