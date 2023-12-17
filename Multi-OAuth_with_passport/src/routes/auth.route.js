import { Router } from "express";
import { addLocalUser, googleAuth, loginlocalUser } from "./controller/auth.js";
import passport from "passport";
import GoogleStrategy from "./middlewares/google.js";
import LocalStrategy from "./middlewares/local.js";
import TwitterStrategy from "./middlewares/twitter.js";
const authRouter = Router();

authRouter
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
    googleAuth
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  )
  //local routes
  .post("/local/register", addLocalUser)
  .post("/local/login", loginlocalUser);
export default authRouter;
