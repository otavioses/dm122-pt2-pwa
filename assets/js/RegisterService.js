const doneCssClass = 'done';
export default class RegisterService {
  constructor(contactService) {
    this.contactService = contactService;
    this.bindFormEvent();
    // this.listContacts();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var inputs = form.elements;
      this.addContact(inputs['nome'].value, inputs['telefone'].value, inputs['email'].value);
      window.location.href = "/";
    });
  }
  

  async addContact(nome, telefone, email) {
    const contact = { nome: nome, telefone: telefone, email: email};
    const contactId = await this.contactService.save(contact);
    contact.id = contactId;
  }

  async listContacts() {
    const contacts = await this.contactService.getAll();
    contacts.forEach((contact) => this.addToHtmlList(contact));
  }

  async deleteContact(contactId, li) {
    await this.contactService.delete(contactId);
    li.remove();
  }

  async saveContact(contact) {
    await this.todoService.save(contact);
  }

  addToHtmlList(contact) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.addEventListener("click", () => this.toggleTask(li, task.id));


    span.textContent = contact.name;

    button.textContent = "x";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteContact(contact.id, li);
    });

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
