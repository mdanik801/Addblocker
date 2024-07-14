document.addEventListener("DOMContentLoaded", function () {
   const button = document.getElementById("toggle-button");

   // Get current state from storage and update button text
   chrome.storage.local.get(["adBlockEnabled"], function (result) {
      if (result.adBlockEnabled) {
         button.textContent = "Disable Ad Blocker";
      } else {
         button.textContent = "Enable Ad Blocker";
      }
   });

   // Add click event listener to the button
   button.addEventListener("click", function () {
      chrome.storage.local.get(["adBlockEnabled"], function (result) {
         const newState = !result.adBlockEnabled;

         // Save the new state to storage
         chrome.storage.local.set({ adBlockEnabled: newState }, function () {
            if (newState) {
               button.textContent = "Disable Ad Blocker";
            } else {
               button.textContent = "Enable Ad Blocker";
            }

            // Notify background script about the change
            chrome.runtime.sendMessage({ adBlockEnabled: newState });
         });
      });
   });
});
