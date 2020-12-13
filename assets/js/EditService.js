import {
  set as setItem,
  get as getItem,
  keys as getKeys,
} from "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs";

const doneCssClass = "done";
export default class EditService {
  constructor(contactService) {
    this.contactService = contactService;
    this.readValue();
  }

  async readValue() {
    const keyInput = "keyId";
    const contactId = await getItem(keyInput);
    this.fillFields(contactId);
  }

  async fillFields(contactId) {
    console.log(contactId);
    const contact = await this.contactService.get(parseInt(contactId));

    const form = document.querySelector("form");
    var inputs = form.elements;
    inputs["nome"].value = contact.nome;
    inputs["telefone"].value = contact.telefone;
    inputs["email"].value = contact.email;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      var inputs = form.elements;
      const nome = inputs["nome"].value;
      const telefone = inputs["telefone"].value;
      const email = inputs["email"].value;
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
  }

  async listContacts() {
    const contact = await this.contactService.get(34);
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
