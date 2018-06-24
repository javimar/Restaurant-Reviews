const staticCacheName = 'restaurant-cache-1';

let urlToCache =
[
    '/',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/10.jpg',
    './img/9.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbHelper.js',
];

self.addEventListener('install', function(event)
// fires up when browser sets up a new SW for the first time
{
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            console.log(cache);
            return cache.addAll(urlToCache);
        }).catch(error => {
            console.log(error);
        })
    );
});

self.addEventListener('activate', function(event)
// fires when the SW becomes active
{
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all( // will wait on the completion of all promises
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                            cacheName != staticCacheName;
                        }).map(function(cacheName) {
                            return caches.delete(cacheName);
                        })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) return response;
            return fetch(event.request);
        })
    );
});
