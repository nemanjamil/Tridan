/* Tridan site script: mobile menu, cookie consent and GA4 (Consent Mode v2, advanced mode).
 *
 * The Google tag loads on every page from <head> with analytics_storage "denied", so it sets no
 * cookies until the visitor clicks Accept; before that Google receives only cookieless pings.
 * The decision lives in localStorage under "tridan-consent" as { v, analytics, decidedAt }.
 * `contact_click` events (mailto/tel links and [data-contact] CTAs) are dropped after Reject.
 * Chat: the official Tridan AI embed (Merkur agent) is inserted once a cookie decision exists, so on
 * phones its launcher never sits on the undecided banner. The widget itself decides how it opens.
 */
(function () {
  "use strict";
  var KEY = "tridan-consent";
  var VERSION = 1;
  var memory = null; // decision when storage is blocked

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- header: glass background once the page scrolls ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var onScroll = function () {
      ticking = false;
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
    onScroll();
  }

  /* ---------- scroll reveal (skipped with reduced motion or without IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window && revealEls.length) {
    var done = function (el) {
      el.classList.add("is-in");
      // Drop the reveal hooks afterwards so hover transitions are not delayed by the stagger.
      setTimeout(function () {
        el.removeAttribute("data-reveal");
      }, 1200);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          io.unobserve(en.target);
          done(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    var vh = window.innerHeight;
    revealEls.forEach(function (el) {
      // Already visible on load: show at once, no flash.
      if (el.getBoundingClientRect().top < vh * 0.92) el.removeAttribute("data-reveal");
      else io.observe(el);
    });
    root.classList.add("reveal-on");
  }

  /* ---------- pointer effects (mouse only, motion allowed) ----------
   * Hero: grid glow follows the cursor (adapted from 21st.dev "DataGridHero").
   * Cards: border glow turns toward the cursor (adapted from 21st.dev "Glowing Effect"). */
  if (finePointer && !reduceMotion) {
    var hero = document.querySelector(".hero");
    var heroBg = hero && hero.querySelector(".hero-bg");
    if (heroBg) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        heroBg.style.setProperty("--mx", e.clientX - r.left + "px");
        heroBg.style.setProperty("--my", e.clientY - r.top + "px");
        hero.classList.add("is-glowing");
      }, { passive: true });
      hero.addEventListener("pointerleave", function () {
        hero.classList.remove("is-glowing");
      });
    }

    var cards = document.querySelectorAll(".glow-card");
    if (cards.length) {
      var last = null;
      var frame = 0;
      var update = function () {
        frame = 0;
        if (!last) return;
        var mx = last.x;
        var my = last.y;
        cards.forEach(function (el) {
          var r = el.getBoundingClientRect();
          var near = 64; // proximity in px
          var active = mx > r.left - near && mx < r.right + near && my > r.top - near && my < r.bottom + near;
          el.style.setProperty("--active", active ? "1" : "0");
          if (!active) return;
          var cx = r.left + r.width / 2;
          var cy = r.top + r.height / 2;
          var target = (Math.atan2(my - cy, mx - cx) * 180) / Math.PI + 90;
          var current = parseFloat(el.style.getPropertyValue("--start")) || 0;
          var diff = ((((target - current) % 360) + 540) % 360) - 180; // shortest way round
          el.style.setProperty("--start", String(current + diff));
        });
      };
      var queue = function () {
        if (!frame) frame = requestAnimationFrame(update);
      };
      document.addEventListener("pointermove", function (e) {
        last = { x: e.clientX, y: e.clientY };
        queue();
      }, { passive: true });
      window.addEventListener("scroll", queue, { passive: true });
    }
  }

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

  /* ---------- chat widget (official Tridan AI embed snippet) ---------- */
  var CHAT_EMBED = "https://nirmata.tridan-ai.com/widget-embed.js";
  var CHAT_AGENT = "https://nirmata.tridan-ai.com/agent/merkur";
  function loadChat() {
    if (document.querySelector('script[src="' + CHAT_EMBED + '"]')) return;
    var s = document.createElement("script");
    s.src = CHAT_EMBED;
    s.setAttribute("data-src", CHAT_AGENT);
    s.async = true;
    document.body.appendChild(s);
  }

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
    loadChat();
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
  else loadChat();

  // A decision made in another tab applies here too.
  window.addEventListener("storage", function (e) {
    if (e.key !== KEY && e.key !== null) return;
    var c = read();
    if (c) {
      showBanner(false);
      setAnalytics(c.analytics);
      loadChat();
    }
  });
})();
