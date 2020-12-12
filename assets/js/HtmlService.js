const doneCssClass = 'done';
export default class HtmlService {
  constructor(contactService) {
    this.contactService = contactService;
    this.listContacts();
  }

  async listContacts() {
    console.log("listContacts");
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
    console.log(contact.telefone);
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.addEventListener("click", () => this.toggleTask(li, task.id));

    // if (task.done) {
    //   li.classList.add(doneCssClass);
    // }

    span.textContent = contact.nome;

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
