// sw.js
const CACHE_NAME = 'xpertoid-v2'; // Atualizamos a versão
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js'
];

// Instalação: Salva os arquivos fundamentais no cache do navegador
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Interceptador de rede: Tenta pegar da rede, se falhar (offline), pega do cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});