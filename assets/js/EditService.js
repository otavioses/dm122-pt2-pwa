const doneCssClass = "done";
export default class EditService {
  constructor(contactService) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const contactId = urlParams.get("contactId");

    this.contactService = contactService;
    this.fillFields(contactId);
  }

  async fillFields(contactId) {
    console.log(contactId);
    const contact = await this.contactService.get(parseInt(contactId));
    console.log(contact.nome);

    // await this.contactService.save(contact);
    // return;

    const form = document.querySelector("form");
    var inputs = form.elements;
    inputs["nome"].value = contact.nome;
    inputs["telefone"].value = contact.telefone;
    inputs["email"].value = contact.email;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var inputs = form.elements;
      console.log(inputs);
      const nome = inputs["nome"].value;
      const telefone = inputs["telefone"].value;
      const email = inputs["email"].email;
      this.updateContact(contact.id, nome, telefone, email);
      window.location.href = "/";
    });
  }

  async updateContact(id, nome, telefone, email) {
    const contact = await this.contactService.get(id);
    contact.nome = nome;
    contact.telefone = telefone;
    contact.email = email;
    await this.contactService.update(id, contact);
  }

  async addContact(nome, telefone, email) {
    const contact = { nome: nome, telefone: telefone, email: email };
    const contactId = await this.contactService.save(contact);
    contact.id = contactId;
    console.log("addContact");
  }

  async listContacts() {
    const contact = await this.contactService.get(34);
    console.log(contact.nome);
    // contacts.forEach((contact) => console.log(contact.nome));
  }

  async loadContact(contactId) {
    const contact = await this.contactService.get(contactId);
    return contact;
  }

  async deleteContact(contactId, li) {
    await this.contactService.delete(contactId);
    li.remove();
  }

  async saveContact(contact) {
    console.log(contact);
    await this.contactService.save(contact);
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
