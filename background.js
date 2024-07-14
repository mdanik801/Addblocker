let adBlockEnabled = false;

const blockedDomains = ["doubleclick.net", "adclick.g.doubleclick.net", "ads.google.com"];

chrome.runtime.onInstalled.addListener(() => {
   chrome.storage.local.get(["adBlockEnabled"], function (result) {
      adBlockEnabled = result.adBlockEnabled || false;
   });
});

chrome.runtime.onMessage.addListener(function (message) {
   if (message.hasOwnProperty("adBlockEnabled")) {
      adBlockEnabled = message.adBlockEnabled;
   }
});

chrome.webRequest.onBeforeRequest.addListener(
   function (details) {
      if (adBlockEnabled) {
         const url = new URL(details.url);
         if (blockedDomains.includes(url.hostname)) {
            return { cancel: true };
         }
      }
   },
   { urls: ["<all_urls>"] },
   ["blocking"]
);
