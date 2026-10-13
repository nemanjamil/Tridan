/* Tridan site script: mobile menu, cookie consent and GA4 (Consent Mode v2, advanced mode).
 *
 * The Google tag loads on every page from <head> with analytics_storage "denied", so it sets no
 * cookies until the visitor clicks Accept; before that Google receives only cookieless pings.
 * The decision lives in localStorage under "tridan-consent" as { v, analytics, decidedAt }.
 * `contact_click` events (mailto/tel links and [data-contact] CTAs) are dropped after Reject.
 */
(function () {
  "use strict";
  var KEY = "tridan-consent";
  var VERSION = 1;
  var memory = null; // decision when storage is blocked

  document.documentElement.classList.add("js");

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---------- consent record ---------- */
  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var c = JSON.parse(raw);
        if (c && c.v === VERSION && typeof c.analytics === "boolean" && c.decidedAt) return c;
      }
    } catch (e) {}
    return memory;
  }
  function write(analytics) {
    var c = { v: VERSION, analytics: analytics === true, decidedAt: new Date().toISOString() };
    memory = c;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(c));
    } catch (e) {}
    return c;
  }
  function forget() {
    memory = null;
    try {
      window.localStorage.removeItem(KEY);
    } catch (e) {}
  }

  /* ---------- gtag ---------- */
  // The Google tag and the consent default are inline in <head> (Consent Mode v2, advanced).
  // This script only updates consent and sends events.
  function gtag() {
    if (typeof window.gtag === "function") window.gtag.apply(window, arguments);
  }
  function setAnalytics(granted) {
    gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
  }

  function clearGaCookies() {
    var names = [];
    try {
      names = document.cookie.split(";").map(function (c) {
        return c.trim().split("=")[0];
      }).filter(function (n) {
        return n === "_ga" || n.indexOf("_ga_") === 0;
      });
    } catch (e) {
      return;
    }
    var host = location.hostname;
    var apex = host.split(".").slice(-2).join(".");
    var domains = ["", host, "." + host, "." + apex];
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + "=; path=/" + (d ? "; domain=" + d : "") + "; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      });
    });
  }

  // Before a decision events go out as cookieless pings (advanced mode); after Reject they are dropped.
  function track(name, params) {
    var c = read();
    if (c && c.analytics === false) return;
    gtag("event", name, params || {});
  }
  window.tridanTrack = track;

  /* ---------- banner ---------- */
  var banner = document.getElementById("cookie-banner");
  function showBanner(show) {
    if (!banner) return;
    banner.hidden = !show;
  }

  function decide(analytics) {
    write(analytics);
    showBanner(false);
    setAnalytics(analytics);
    if (!analytics) clearGaCookies();
  }

  if (banner) {
    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-consent]");
      if (!btn) return;
      decide(btn.getAttribute("data-consent") === "accept");
    });
  }

  document.addEventListener("click", function (e) {
    var settings = e.target.closest("[data-cookie-settings]");
    if (settings) {
      e.preventDefault();
      // Reopening withdraws consent until the visitor decides again.
      forget();
      setAnalytics(false);
      clearGaCookies();
      showBanner(true);
      var first = banner && banner.querySelector("button");
      if (first) first.focus();
      return;
    }
    var link = e.target.closest("a[href^='mailto:'], a[href^='tel:'], [data-contact]");
    if (link) {
      var href = link.getAttribute("href") || "";
      track("contact_click", {
        method: href.indexOf("mailto:") === 0 ? "email" : href.indexOf("tel:") === 0 ? "phone" : "cta",
        link_url: href,
        page_path: location.pathname,
      });
    }
  });

  // The consent default in <head> already reflects a stored Accept; only ask when undecided.
  if (!read()) showBanner(true);

  // A decision made in another tab applies here too.
  window.addEventListener("storage", function (e) {
    if (e.key !== KEY && e.key !== null) return;
    var c = read();
    if (c) {
      showBanner(false);
      setAnalytics(c.analytics);
    }
  });
})();
