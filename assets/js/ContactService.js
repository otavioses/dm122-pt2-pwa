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
    console.log("getAll");
    return db.contatos.toArray();
  }

  get(id) {
    console.log("getAll id");
    return db.contatos.get(id);
  }

  save(contato) {
    console.log("save");
    return db.contatos.put(contato);
  }

  delete(id) {
    console.log("delete");
    return db.contatos.delete(id);
  }
}
