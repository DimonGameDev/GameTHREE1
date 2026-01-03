const CACHE_NAME = 'version-of-war-v1.0.57';

// Файли які кешуються при встановленні
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',

  // Page 1
  './html/page1/page1.html',
  './html/page1/page1.css',
  './html/page1/page1.js',

  // Page 2
  './html/page2/page2_2.html',
  './html/page2/page2_2.css',
  './html/page2/page2_2.js',

  // Page 3
  './html/page3/page3.html',
  './html/page3/page3.css',

  // Критичні зображення (додай найважливіші)
  './img/image.jpg',
  './img/map/grass/grass.jpeg',
  './img/map/infoTablo/gold/gold.png',
  './img/map/infoTablo/armor/armor.png',
  './img/map/infoTablo/swords/swords.png',
  './img/map/infoTablo/HP/hp.png',
  
  // Основні JS файли для page3 (найкритичніші)
  './js/page3/globals/globals.js',
  './js/asset/units/units2.js',
  './js/asset/heroes/heroesList.js',
  './js/page3/mapData/map/loadingMap.js'
];

// Встановлення Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // console.log('📦 Кешування файлів');
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
          // console.log('✅ З кешу:', event.request.url);
          return response;
        }
        // console.log('🌐 З мережі:', event.request.url);
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
              })
              .catch((error) => {
                // Ігноруємо помилки кешування
                console.warn('⚠️ Помилка кешування:', error);
              });
            return response;
          }
        ).catch((error) => {
          // Якщо файл не знайдено - повертаємо порожню відповідь замість помилки
          console.warn('⚠️ Файл не знайдено:', event.request.url);
          return new Response('', { status: 404, statusText: 'Not Found' });
        });
      })
  );
});