import { Router } from "express";
import { addLocalUser, googleAuth, loginlocalUser } from "./controller/auth.js";
import passport from "passport";
import GoogleStrategy from "./middlewares/google.js";
import LocalStrategy from "./middlewares/local.js";
import TwitterStrategy from "./middlewares/twitter.js";
const authRouter = Router();

authRouter
  // google routes
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
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
  .post("/local/login", loginlocalUser)

  // twitter routes
  .get("/twitter", passport.authenticate("twitter"))
  .get(
    "/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );
export default authRouter;
