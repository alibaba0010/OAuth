import { Router } from "express";
import {
  authLogin,
  googleLogin,
  googleRedirect,
  logout,
} from "../controllers/auth.controller.js";
import passport from "passport";
import passportSetup from "../services/passport.js";

const authRouter = Router();
authRouter
  // CUSTOM LOGIN
  .get("/login", authLogin)
  // GOOGLE LOGIN
  .get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  )
  //GOGGLE REDIRECT
  .get("/google/redirect", passport.authenticate("google"), googleRedirect)
  //LOGOUT
  .get("/logout", logout);

export default authRouter;
