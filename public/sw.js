const CACHE='kelasi-v6';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/index.html','/manifest.webmanifest','/logo.svg'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).hostname.includes('supabase'))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{caches.open(CACHE).then(c=>c.put(e.request,x.clone()));return x}).catch(()=>caches.match('/index.html'))))});
