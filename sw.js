self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./scripts/script.js",
                "./styles/bootstrap.min.css",
                "./styles/progress.css",
                "./styles/style.css",
                "./assets/splash.png",
                "./assets/logo-192.png",
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});