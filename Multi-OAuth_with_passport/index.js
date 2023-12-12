import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";

import path, { join } from "path";
import { fileURLToPath } from "url";
import authRouter from "./src/routes/auth.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(express.static(join(__dirname + "/node_modules/bootstrap/dist")));

app.get("/", async (req, res) => {
  res.sendFile(join(__dirname, "public", "auth.html"));
});
app.use(authRouter);

app.listen(8000, () => {
  console.log("app listening port 8000");
});
