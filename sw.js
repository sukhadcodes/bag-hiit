// Offline cache for Bag HIIT. Bump VERSION whenever you change any file.
const VERSION = 'bag-hiit-v3';
const CORE = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];
const CLIPS = ['comingup','cool','cross','crossb','done','go','guard','half','jab','jabb','lastround','lhook','lhookb','lover','lupper','lupperb','moderate','move','n1','n1b','n2','n2b','n3','n3b','n4','n4b','n5','n5b','n6','n6b','next','r1','r10','r2','r3','r4','r5','r6','r7','r8','r9','ready','rest','restgood','resume','rhook','rhookb','roll','roundbreak','rover','rupper','rupperb','set1','set2','set3','set4','set5','setfinal','slipl','slipr','stepin','stepout','ten','test','then','thenmod','thirtyleft','w_bob_left','w_bob_right','w_cover','w_footwork','w_freestyle','w_movement','w_shadow','w_slipping','w_step_left','w_step_right'];
const AUDIO = ['heart','michael'].flatMap(v => CLIPS.map(k => `./audio/${v}/${k}.mp3`));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(CORE);
    await Promise.all(AUDIO.map(u => c.add(u).catch(() => {})));
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Voice clips never change: cache first. Pages: network first so updates arrive, cache when offline.
  if (url.pathname.includes('/audio/')) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
