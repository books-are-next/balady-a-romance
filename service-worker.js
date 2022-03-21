/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-966ce0d';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./balady_a_romance_002.html","./balady_a_romance_005.html","./balady_a_romance_006.html","./balady_a_romance_007.html","./balady_a_romance_008.html","./balady_a_romance_009.html","./balady_a_romance_010.html","./balady_a_romance_011.html","./balady_a_romance_012.html","./balady_a_romance_013.html","./balady_a_romance_014.html","./balady_a_romance_015.html","./balady_a_romance_016.html","./balady_a_romance_017.html","./balady_a_romance_018.html","./balady_a_romance_019.html","./balady_a_romance_020.html","./balady_a_romance_021.html","./balady_a_romance_022.html","./balady_a_romance_023.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image003.jpg","./resources/image004.jpg","./resources/obalka_balady_a_romance2.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
