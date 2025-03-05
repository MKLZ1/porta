'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "703287f3c2da80033ba8b7ea7caf1c89",
"assets/AssetManifest.bin.json": "cc5d56833d101593c9d1640bfd740697",
"assets/AssetManifest.json": "a917788e6a510f443617a3cd71d11173",
"assets/assets/google_fonts/PressStart2P-Regular.ttf": "f98cd910425bf727bd54ce767a9b6884",
"assets/assets/google_fonts/Roboto-Regular.ttf": "8a36205bd9b83e03af0591a004bc97f4",
"assets/FontManifest.json": "96629121be9e956ba0da71332bfb0909",
"assets/fonts/MaterialIcons-Regular.otf": "8f96f71a032cb3aed976b7558df3da89",
"assets/lib/assets/1.png": "40026838391fc9888f3b96a4f8f086dc",
"assets/lib/assets/ataque_control.png": "d9a06898d6854ae657ad23900b09bc5a",
"assets/lib/assets/bushes.png": "7f5c3910874b45762262fbf661d47d37",
"assets/lib/assets/cascada.png": "212b044d5b44d6b2b5979721e369fd8d",
"assets/lib/assets/down.png": "ad87373f72a639557e5a1712be42902b",
"assets/lib/assets/error.png": "79251d16e8a00c458e5aec18633a86ed",
"assets/lib/assets/fondomarco.png": "1a345a48357f2bfb16b66463cbd2d808",
"assets/lib/assets/Lab1.png": "4f001bd20decb78b6fd0eb2f061ac449",
"assets/lib/assets/left.png": "ae01c4a650d9a89d4261eea5666d9791",
"assets/lib/assets/lineas_radar.png": "bf1c504f8540e0157ad86c400c9648e9",
"assets/lib/assets/marco2.png": "d50d93ddc89e29cfce57b6ef525ee63a",
"assets/lib/assets/pipo-popupemotes001.png": "f7ef3306f1cbe3125e16ebb506a4e675",
"assets/lib/assets/plant_repack.png": "e6a4f896874ba1fab1b5c21b1d1f7b32",
"assets/lib/assets/prueba.json": "04b6e4955d85687f11d873d447e2b9ae",
"assets/lib/assets/rabbit.png": "e51ff616dd460da5d539bcb6d4c20d38",
"assets/lib/assets/rayoFinal.png": "1c6d9f6b8bccc507b570d382ddb96a43",
"assets/lib/assets/right.png": "c8224a69ddce0cbc86fbad69c1021168",
"assets/lib/assets/rodar.png": "04b4e92cff1acc56ae3f663387c24c60",
"assets/lib/assets/smoke.png": "f984f55b5ecf3ee6ae733750b03fb37f",
"assets/lib/assets/tiburon.png": "bc43874f38a25104f93631f8f287ef65",
"assets/lib/assets/up.png": "ec713d39e8433f90c1b964ffb76cff52",
"assets/NOTICES": "add1fbd921774cafbf85b33be4c0668f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/bloom.frag": "c91d5ea23b8a6c881f1e62ef2d0de22d",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/polygon.frag": "6ac41dab08696833a87a05a425e1d9cb",
"assets/shaders/void.frag": "00c828d6ad5bb4078215b8554fc00130",
"assets/shaders/void_background.frag": "0ddc7e5cffdfd0215a8152550f8291ea",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "762768fa7f881d690bde26f343cc2c0e",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "1085e5f7a144c8170f11f2328c64c591",
"/": "1085e5f7a144c8170f11f2328c64c591",
"main.dart.js": "e1762456152616bae694f66d54a4dfd8",
"main.dart.mjs": "1f47b37e7572167ff471b86c37fbb0dc",
"main.dart.wasm": "569c74884b35d182016a566fd63f3c16",
"manifest.json": "5a322f12afd2835026afee7b4f674991",
"version.json": "0cda01c166846151e62f100767c36fe4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
