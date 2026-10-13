/* Tridan site script: mobile menu, cookie consent and GA4 (Consent Mode v2, basic mode).
 *
 * Basic mode: the Google tag (gtag.js) is NOT requested until the visitor clicks Accept.
 * The decision lives in localStorage under "tridan-consent" as { v, analytics, decidedAt }.
 * `contact_click` events (mailto/tel links and [data-contact] CTAs) are queued while the
 * visitor has not decided, sent after Accept, and dropped after Reject.
 */
(function () {
  "use strict";
  var GA_ID = document.documentElement.getAttribute("data-ga") || "";
  var KEY = "tridan-consent";
  var VERSION = 1;
  var MAX_QUEUE = 20;
  var memory = null; // decision when storage is blocked
  var loaded = false;
  var queue = [];

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
  // Must stay a classic function forwarding `arguments`: Google ignores consent
  // commands pushed as plain arrays.
  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function loadGa() {
    if (loaded || !GA_ID) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    });
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    var pending = queue;
    queue = [];
    for (var i = 0; i < pending.length; i++) gtag("event", pending[i][0], pending[i][1]);
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

  function track(name, params) {
    var c = read();
    if (c && c.analytics === false) return; // rejected: drop
    if (loaded && c && c.analytics) {
      gtag("event", name, params || {});
      return;
    }
    if (queue.length >= MAX_QUEUE) queue.shift();
    queue.push([name, params || {}]);
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
    if (analytics) {
      loadGa();
    } else {
      queue = [];
      if (loaded) gtag("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
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
      queue = [];
      if (loaded) gtag("consent", "update", { analytics_storage: "denied" });
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

  var current = read();
  if (current && current.analytics) loadGa();
  else if (!current) showBanner(true);

  // A decision made in another tab applies here too.
  window.addEventListener("storage", function (e) {
    if (e.key !== KEY && e.key !== null) return;
    var c = read();
    if (c && c.analytics) {
      showBanner(false);
      loadGa();
    } else if (c) {
      showBanner(false);
    }
  });
})();
