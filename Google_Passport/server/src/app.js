import express, { json } from "express";
import "express-async-errors";
import session from "express-session";
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
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(profileRouter)
  .use("/auth", authRouter);
export default app;
