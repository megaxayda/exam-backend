import app from "./app";
import dotenv from "dotenv";

dotenv.config();

app(process.env.PORT).catch(console.error);
