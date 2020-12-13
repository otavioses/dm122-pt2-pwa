import RegisterService from "./RegisterService.js";
import ContactService from "./ContactService.js";

class Register {
  constructor() {
    this.initialize();
  }

  initialize() {
    new RegisterService(new ContactService());
  }
}

new Register();
