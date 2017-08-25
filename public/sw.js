importScripts('workbox-sw.prod.v2.0.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "daube-header.js",
    "revision": "3682c09e2598dd3bd72b8c5762831dc7"
  },
  {
    "url": "daube-user-icon.js",
    "revision": "42f4ca964069c168e2f83ad89070d339"
  },
  {
    "url": "images/daubedesign.ico",
    "revision": "24512db0081f46a91b8fdce36c155669"
  },
  {
    "url": "images/google.png",
    "revision": "116d7abaea20868404cb366b611c69b7"
  },
  {
    "url": "images/manifest/daubedesign-144x144.png",
    "revision": "d851bfbbde0c69fd55d2bda6a9029780"
  },
  {
    "url": "images/manifest/daubedesign-192x192.png",
    "revision": "0d48fe25d41ac2525e700253079c77bd"
  },
  {
    "url": "images/manifest/daubedesign-48x48.png",
    "revision": "b3a2ade5ce8c2dde247bd6309e8b28f9"
  },
  {
    "url": "images/manifest/daubedesign-512x512.png",
    "revision": "a9acaf6158ddae45bacbb1fe9a1e2aea"
  },
  {
    "url": "images/manifest/daubedesign-72x72.png",
    "revision": "7d7818d22bb0917954b810ceb36df923"
  },
  {
    "url": "images/manifest/daubedesign-96x96.png",
    "revision": "42c8b57174ff192635100bf0115651d5"
  },
  {
    "url": "images/user_avatar.png",
    "revision": "889ee0461e8341ab1362eee21a2ba764"
  },
  {
    "url": "index.html",
    "revision": "9313d38fdbe4088f0a23ae9f47a2e07e"
  },
  {
    "url": "manifest.json",
    "revision": "d30e269cd7568e8e4d46df346a04b481"
  },
  {
    "url": "rooms-home.js",
    "revision": "39996dcfe03f1ca1c6eed1ffbff16271"
  },
  {
    "url": "scripts/date.js",
    "revision": "497166e7f447a56c7b279271c6c6e6c8"
  },
  {
    "url": "scripts/initfire.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "scripts/main.js",
    "revision": "05cc6180493e87f01403e6dff7d10f86"
  },
  {
    "url": "webcomponentjs/webcomponents-lite.js",
    "revision": "92471d86a35d74c7ed6bf2d1153a71cb"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
