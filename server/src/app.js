import express, { json } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs").use(cors()).use(json());
//   .use("/", express.static("public"))

export default app;
