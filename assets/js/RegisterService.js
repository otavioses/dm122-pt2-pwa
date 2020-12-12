const doneCssClass = 'done';
export default class RegisterService {
  constructor(contactService) {
    this.contactService = contactService;
    this.bindFormEvent();
    // this.listContacts();
  }

  bindFormEvent() {
    console.log("bindFormEvent");
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      console.log("submit");
      event.preventDefault();
      var inputs = form.elements;
      console.log(inputs);
      this.addContact(inputs['nome'].value, inputs['telefone'].value, inputs['email'].value);
    });
  }

  async addContact(nome, telefone, email) {
    const contact = { nome: nome, telefone: telefone, email: email};
    const contactId = await this.contactService.save(contact);
    contact.id = contactId;
    console.log("addContact");
    // this.addToHtmlList(contact);
  }

  async listContacts() {
    const contacts = await this.contactService.getAll();
    contacts.forEach((contact) => this.addToHtmlList(contact));
  }

  async deleteContact(contactId, li) {
    await this.contactService.delete(contactId);
    li.remove();
  }

  // async saveTask(taskId, isDone) {
  //   const task = await this.todoService.get(taskId);
  //   task.done = isDone;
  //   await this.todoService.save(task);
  // }

  // toggleTask(li, taskId) {
  //   li.classList.toggle(doneCssClass);
  //   const isDone = li.classList.contains(doneCssClass);
  //   this.saveTask(taskId, isDone);
  // }

  addToHtmlList(contact) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.addEventListener("click", () => this.toggleTask(li, task.id));

    // if (task.done) {
    //   li.classList.add(doneCssClass);
    // }

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
