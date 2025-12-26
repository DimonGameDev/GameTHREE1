const CACHE_NAME = 'version-of-war-v1.0';

// Файли які кешуються при встановленні
const urlsToCache = [
  '/GameTHREE1/',
  '/GameTHREE1/html/page1/page1.html',
  '/GameTHREE1/html/page1/page1.css',
  '/GameTHREE1/html/page1/page1.js',
  '/GameTHREE1/html/page2/page2_2.html',
  '/GameTHREE1/html/page2/page2_2.css',
  '/GameTHREE1/html/page2/page2_2.js',
  '/GameTHREE1/html/page3/page3.html',
  '/GameTHREE1/html/page3/page3.css',
  '/GameTHREE1/manifest.json'
];

// Встановлення Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Кешування файлів');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Активація
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Видалення старого кешу:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Обробка запитів (спочатку кеш, потім мережа)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('✅ З кешу:', event.request.url);
          return response;
        }
        console.log('🌐 З мережі:', event.request.url);
        return fetch(event.request).then(
          (response) => {
            // Кешуємо нові файли
            if (!response || response.status !== 200) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});