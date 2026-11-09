/**
 * MKnet Network Manager - Progressive Web App Service Worker
 * Version: 1.0.0
 * Strategy: Safe static-asset caching, offline shell fallback, zero API/sensitive data caching.
 */

const CACHE_NAME = "mknet-static-v1.0.0";

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
  "./css/tokens.css",
  "./css/base.css",
  "./css/layout.css",
  "./css/components.css",
  "./fonts/inter-latin.woff2",
  "./js/main.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        STATIC_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "no-cache" });
            if (response.ok) await cache.put(url, response);
          } catch (err) {}
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
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

  if (req.method !== "GET" || url.pathname.startsWith("/api/") || url.pathname === "/ws") {
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match("./index.html") || await cache.match("index.html") || await cache.match("./");
        if (cached) return cached;
        return new Response(
          "<!doctype html><html lang='ar' dir='rtl'><head><meta charset='utf-8'><title>MKnet - غير متصل</title><style>body{background:#070a10;color:#f1f5f9;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}h1{color:#38bdf8}</style></head><body><div><h1>MKnet Network Manager</h1><p>أنت حاليًا غير متصل بالإنترنت. يتطلب التحكم في الشبكة الاتصال ببوابة MKnet.</p></div></body></html>",
          { headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
      })
    );
    return;
  }

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
