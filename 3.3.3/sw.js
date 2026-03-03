const CACHE_NAME = 'spring-poem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/music/wind.mp3',
  '/music/guitar.mp3',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js',
  'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=LXGW+WenKai&display=swap'
];

// 安装时缓存核心资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 拦截请求，优先返回缓存，无缓存则网络获取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});