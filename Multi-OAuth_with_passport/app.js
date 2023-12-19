import express, { json } from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import FacebookStrategy from "./src/routes/middlewares/facebook.js";
import ejs from "ejs";
const app = express();
dotenv.config();

app
  .set("view engine", "ejs")
  .use(json())
  .use(
    session({
      // maxAge: 24 * 60 * 60 * 1000,
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  )
  .use(passport.initialize())
  .use(passport.session())

  .get("/", (wreq, res) => {
    res.render("index.ejs");
  });

app.listen(8000, () => {
  console.log("Listening at port 8000");
});
