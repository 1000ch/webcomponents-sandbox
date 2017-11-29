const CACHE_KEY = '20171129';
const CACHE_FILES = [
  '/',
  'app.js',
  'app-drawer.js',
  'app-header.js',
  'app-layout.js',
  'app-main.js',
  'button-amber.js',
  'button-black.js',
  'button-blue-grey.js',
  'button-blue.js',
  'button-brown.js',
  'button-cyan.js',
  'button-deep-orange.js',
  'button-deep-purple.js',
  'button-green.js',
  'button-grey.js',
  'button-indigo.js',
  'button-light-blue.js',
  'button-light-green.js',
  'button-lime.js',
  'button-orange.js',
  'button-pink.js',
  'button-purple.js',
  'button-red.js',
  'button-teal.js',
  'button-yellow.js',
  'index.js',
  'app.css'
];

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  const deletion = caches.keys()
    .then(keys => keys.filter(key => key !== CACHE_KEY))
    .then(keys => Promise.all(keys.map(key => caches.delete(key))));

  event.waitUntil(deletion.then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (!CACHE_FILES.some(file => event.request.url.includes(file))) {
    return;
  }

  const fetching = caches.open(CACHE_KEY).then(cache => {
    return cache.match(event.request).then(response => {
      return response || fetch(event.request.clone()).then(response => {
        if (!response.ok) {
          return;
        }

        return cache.put(event.request, response.clone()).then(() => response);
      });
    });
  });

  event.respondWith(fetching);
});
