const CACHE_NAME = 'renovyte-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './catalog.html',
    './styles/index.min.css',
    './styles/components/navigation.min.css',
    './styles/components/footer.min.css',
    './styles/components/hero.min.css',
    './scripts/navigation.min.js',
    './scripts/cart.min.js',
    './assets/images/hero/hero_smoke_v2.webp'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching all assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
