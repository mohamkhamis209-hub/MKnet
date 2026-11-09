/**
 * MKnet Network Manager - Progressive Web App Service Worker
 * Version: 1.0.0
 * Strategy: Safe static-asset caching, offline shell fallback, zero API/sensitive data caching.
 */

const CACHE_NAME = "mknet-static-v1.0.0";

// Core static assets for offline application shell
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./favicon.svg",
  "./logo.svg",
  "./manifest.webmanifest",
  "./icons/mk-192.png",
  "./icons/mk-512.png",
  "./icons/mk-192-maskable.png",
  "./icons/mk-512-maskable.png",
  "./web/css/tokens.css",
  "./web/css/base.css",
  "./web/css/layout.css",
  "./web/css/components.css",
  "./web/fonts/inter-latin.woff2",
  "./web/js/main.js",
  "./web/js/core/dom.js",
  "./web/js/core/api.js",
  "./web/js/core/ws.js",
  "./web/js/core/i18n.js",
  "./web/js/core/prefs.js",
  "./web/js/core/particles.js",
  "./web/js/core/live.js",
  "./web/js/core/store.js",
  "./web/js/core/vpn.js",
  "./web/js/core/overviewData.js",
  "./web/js/core/actions.js",
  "./web/js/i18n/ar.js",
  "./web/js/i18n/en.js",
  "./web/js/components/ui.js",
  "./web/js/components/icons.js",
  "./web/js/components/toast.js",
  "./web/js/components/dialog.js",
  "./web/js/components/drawer.js",
  "./web/js/components/chart.js",
  "./web/js/components/dailyPlan.js",
  "./web/js/components/welcome.js",
  "./web/js/components/userDrawer.js",
  "./web/js/components/peopleDialogs.js",
  "./web/js/pages/overview.js",
  "./web/js/pages/people.js",
  "./web/js/pages/quota.js",
  "./web/js/pages/network.js",
  "./web/js/pages/internet.js",
  "./web/js/pages/internetWan.js",
  "./web/js/pages/security.js",
  "./web/js/pages/securityDns.js",
  "./web/js/pages/vpn.js",
  "./web/js/pages/insights.js",
  "./web/js/pages/share.js",
  "./web/js/pages/shareLive.js",
  "./web/js/pages/system.js",
  "./web/js/pages/systemTabs.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache assets individually so failure of one does not break installation
      await Promise.allSettled(
        STATIC_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "no-cache" });
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch (err) {
            // Optional offline asset, ignore individual failure
          }
        })
      );
    })
  );
  // Do not automatically force takeover without user prompt (unless requested via message)
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. NEVER CACHE API, WEBSOCKET, OR NON-GET REQUESTS
  // This guarantees security, privacy, and freshness of network control actions.
  if (req.method !== "GET" || url.pathname.startsWith("/api/") || url.pathname === "/ws") {
    return; // Pass through to network directly
  }

  // 2. Navigation requests: Network-first, fallback to cached index.html
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match("./index.html") || await cache.match("index.html") || await cache.match("./");
        if (cached) return cached;
        return new Response(
          "<!doctype html><html lang='ar' dir='rtl'><head><meta charset='utf-8'><title>MKnet - غير متصل</title><style>body{background:#070a10;color:#f1f5f9;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}h1{color:#38bdf8}</style></head><body><div><h1>MKnet Network Manager</h1><p>أنت حاليًا غير متصل بالإنترنت. تم حفظ التطبيق في الذاكرة المؤقتة، ولكن التحكم في الشبكة يتطلب الاتصال ببوابة MKnet.</p></div></body></html>",
          { headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
      })
    );
    return;
  }

  // 3. Static assets: Stale-While-Revalidate (fast load from cache + silent background update)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
