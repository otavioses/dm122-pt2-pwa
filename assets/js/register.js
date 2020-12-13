import RegisterService from "./RegisterService.js";
import ContactService from "./ContactService.js";

class Register {
  constructor() {
    this.registerServiceWorker();
    this.initialize();
  }

  initialize() {
    new RegisterService(new ContactService());
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

new Register();
