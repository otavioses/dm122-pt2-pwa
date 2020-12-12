const doneCssClass = 'done';
export default class HtmlService {
  constructor(contactService) {
    this.contactService = contactService;
    this.listContacts();
  }

  async listContacts() {
    const contacts = await this.contactService.getAll();
    contacts.forEach((contact) => this.addToHtmlList(contact));
  }

  async deleteContact(contactId, li) {
    await this.contactService.delete(contactId);
    li.remove();
  }

  async editContact(contact) {
    // document.location.href = '/register.html';
  }

  addToHtmlList(contact) {
    console.log(contact.telefone);
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    const editIcon = document.createElement("i");
    editIcon.className = "material-icons md-18"
    editIcon.innerHTML = "edit"

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "material-icons md-18"
    deleteIcon.innerHTML = "delete"

    span.textContent = contact.nome;

    editButton.appendChild(editIcon);
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.editContact(contact);
    });

    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteContact(contact.id, li);
    });

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  }
}
