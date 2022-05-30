import Datastore from "nedb";

const db = new Datastore({ filename: "database/app.db", autoload: true });

export default db;
