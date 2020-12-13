import EditService from "./EditService.js";
import ContactService from "./ContactService.js";

class Edit {
  constructor() {
    this.initialize();
  }

  initialize() {
    new EditService(new ContactService());
  }
}

new Edit();
