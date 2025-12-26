const CACHE_NAME = 'versionofwar-v3';
const urlsToCache = [
  '/GameTHREE1/',
  '/GameTHREE1/index.html',
  '/GameTHREE1/manifest.json',
  '/GameTHREE1/html/page1/page1.html',
  '/GameTHREE1/html/page1/page1.css',
  '/GameTHREE1/html/page1/page1.js',
  '/GameTHREE1/html/page2/page2.html',
  '/GameTHREE1/html/page3/page3.html',
  '/GameTHREE1/img/image.jpg'
];

// ============================================
// ВСТАНОВЛЕННЯ SERVICE WORKER
// ============================================
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Встановлення...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Відкрито кеш');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Всі файли закешовано!');
      })
      .catch((error) => {
        console.error('❌ Помилка кешування:', error);
      })
  );
});

// ============================================
// АКТИВАЦІЯ SERVICE WORKER
// ============================================
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker: Активація...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Видалено старий кеш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Активувати Service Worker негайно
  return self.clients.claim();
});

// ============================================
// ПЕРЕХОПЛЕННЯ ЗАПИТІВ (офлайн режим!)
// ============================================
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Якщо файл є в кеші - повертаємо його
        if (response) {
          console.log('📦 З кешу:', event.request.url);
          return response;
        }
        
        // Якщо немає - завантажуємо з мережі
        console.log('🌐 З мережі:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Перевіряємо чи це валідна відповідь
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Клонуємо відповідь (можна використати тільки раз)
            const responseToCache = response.clone();
            
            // Зберігаємо в кеш для наступного разу
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('❌ Помилка завантаження:', error);
            // Тут можна повернути офлайн сторінку
          });
      })
  );
});