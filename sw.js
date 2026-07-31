const CACHE_NAME = 'pronunciation-player-v3';
const PAGES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./pronunciation-player-baby-aninal.html",
  "./pronunciation-player-body-parts.html",
  "./pronunciation-player-clothes.html",
  "./pronunciation-player-colours.html",
  "./pronunciation-player-community-facilities.html",
  "./pronunciation-player-cooked-food.html",
  "./pronunciation-player-daily-necessities.html",
  "./pronunciation-player-dry-goods-condiments.html",
  "./pronunciation-player-electric-appliance.html",
  "./pronunciation-player-farm-animals.html",
  "./pronunciation-player-festivals.html",
  "./pronunciation-player-food.html",
  "./pronunciation-player-frozen-food.html",
  "./pronunciation-player-fruits.html",
  "./pronunciation-player-furniture.html",
  "./pronunciation-player-goldfish-flowers.html",
  "./pronunciation-player-it-gadgets.html",
  "./pronunciation-player-insects.html",
  "./pronunciation-player-land-transportation.html",
  "./pronunciation-player-occupations.html",
  "./pronunciation-player-playground-park.html",
  "./pronunciation-player-school.html",
  "./pronunciation-player-sea-air-transportation.html",
  "./pronunciation-player-sea-animals.html",
  "./pronunciation-player-shapes.html",
  "./pronunciation-player-siu-mei.html",
  "./pronunciation-player-stationery.html",
  "./pronunciation-player-toys.html",
  "./pronunciation-player-vegetables.html",
  "./pronunciation-player-zoo-animals.html"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(PAGES_TO_CACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(url.hostname.includes('gstatic.com')||url.hostname.includes('cuhk.edu.hk')||url.pathname.endsWith('.mp3')||url.pathname.endsWith('.wav')){event.respondWith(fetch(event.request).catch(()=>new Response('',{status:503})));return;}
  if(url.hostname.includes('fonts.gstatic.com')||url.hostname.includes('fonts.googleapis.com')){event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request).then(r=>{const clone=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(event.request,clone));return r;})));return;}
  event.respondWith(caches.match(event.request).then(cached=>{if(cached)return cached;return fetch(event.request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,clone));}return res;}).catch(()=>caches.match('./index.html'));}));
});
