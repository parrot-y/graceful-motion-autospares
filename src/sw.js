const CACHE_NAME = 'renovyte-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './catalog.html',
    './product-details.html',
    './styles/index.css',
    './styles/components/navigation.css',
    './styles/components/footer.css',
    './styles/components/hero.css',
    './scripts/navigation.js',
    './scripts/cart.js',
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
