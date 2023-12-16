import { Router } from "express";
import { googleAuth } from "./controller/auth.js";
import passport from "passport";
import GoogleStrategy from "./middlewares/google.js";
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
  .pist("/local/register");
export default authRouter;
