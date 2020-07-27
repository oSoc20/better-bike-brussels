"use strict";

const cache_version = "cache-v1.0.0";

const assets = [
  "/offline.html",
  "/images/logo.png",
  "/stylesheets/reset.css",
  "/stylesheets/style.css",
  "/images/placeholder_minified.jpg",
  "/images/placeholder.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cache_version).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return cacheRes || fetch(event.request);
      })
      .catch(() => {
        return caches.match("/offline.html");
      })
  );
});
