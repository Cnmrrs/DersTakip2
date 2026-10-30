const CACHE_NAME = 'ders-takip-shell-v16.1.1-beta2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg'
];
const FIREBASE_CDN = [
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    // Best-effort SDK caching. Failure here must not prevent the app shell installing.
    await Promise.allSettled(FIREBASE_CDN.map(async url => {
      const request = new Request(url, {mode: 'cors'});
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('ders-takip-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Keep Firebase requests online-first, then use a previously cached SDK if offline.
  if (url.origin === 'https://www.gstatic.com' && url.pathname.includes('/firebasejs/')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response('', {status: 503, statusText: 'Offline'});
      }
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && (request.destination === 'document' || request.destination === 'style' || request.destination === 'script' || request.destination === 'image')) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const fallback = await caches.match('./index.html');
        if (fallback && request.mode === 'navigate') return fallback;
        return new Response('Çevrimdışısın. Bu içerik daha önce önbelleğe alınmamış.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
  }
});
