/**
 * D:\DuAnLapTrinh\frontend\sw.js
 * Service Worker để Cache tài nguyên tĩnh và tối ưu tốc độ
 */
const CACHE_NAME = 'cpp-judge-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/assets/css/core.css',
    '/src/app.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
];

// Cài đặt Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Phản hồi yêu cầu từ Cache (Cache First Strategy)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});