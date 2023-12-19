import express, { json } from "express";
import cookieSession from "cookie-session";
import createToken from "./src/createToken.js";
const app = express();
app
  .use(json())
  .use(
    cookieSession({
      signed: false,
      secure: false, //process.env.NODE_ENV !== "test"
      maxAge: 24 * 60 * 60 * 1000,
    })
  ) // 24 hours
  .use(createToken);

export default app;
