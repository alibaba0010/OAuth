import express, { json } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import profileRouter from "./routes/profile.router.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app
  .set("view engine", "ejs")
  .use(cors())
  .use(json())
  .use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: process.env.COOKIE_KEY,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(passport.session())
  .use("/auth", authRouter)
  .use("/", profileRouter);

export default app;
