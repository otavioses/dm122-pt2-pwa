import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class ContactService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("contactDB");

    db.version(1).stores({
      contatos: "++id,json",
    });

    db.open();
  }

  getAll() {
    return db.contatos.toArray();
  }

  get(id) {
    return db.contatos.get(id);
  }

  save(contato) {
    return db.contatos.put(contato);
  }

  update(id, contato) {
    return db.contatos.update(id, contato);
  }

  delete(id) {
    return db.contatos.delete(id);
  }
}
