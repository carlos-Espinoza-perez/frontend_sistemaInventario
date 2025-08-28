const CACHE_NAME = 'sistema-inventario-1756350796630';
const OFFLINE_URL = '/';
const FILES_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icons/Logo-192.png',
  '/icons/Logo-512.png',
];

// 📦 Precaching básico (solo lo esencial)
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activar inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of FILES_TO_CACHE) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn(`No se pudo cachear ${url}:`, err);
        }
      }
    })
  );
});

// 🧹 Limpiar cachés viejas
self.addEventListener('activate', (event) => {
  clients.claim(); // Tomar control sin esperar
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// 🌐 Interceptar todas las solicitudes
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // 📄 Soporte para navegación (SPA con rutas como /proyecto/1)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // 📌 Cache dinámico para todos los archivos
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            event.request.url.startsWith(self.location.origin)
          ) {
            const responseClone = networkResponse.clone(); // ✅ Clonamos antes de usar
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// ⚡ Soporte para actualizaciones instantáneas
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
