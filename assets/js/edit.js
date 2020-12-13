import EditService from "./EditService.js";
import ContactService from "./ContactService.js";

class Edit {
  constructor() {
    this.registerServiceWorker();
    this.initialize();
  }

  initialize() {
    new EditService(new ContactService());
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      const onsuccess = () => console.log("[Service Worker] Registered");
      const onfailure = () => console.log("[Service Worker] Failed");

      navigator.serviceWorker
        .register("sw.js")
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new Edit();
