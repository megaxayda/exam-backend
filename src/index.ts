import app from "./app";
import dotenv from "dotenv";
import nedb from "./nedb";

dotenv.config();

nedb.ensureIndex({ fieldName: "username", unique: true }, function (err) {
  if (err) {
    throw err;
  }

  app(process.env.PORT).catch(console.error);
});
