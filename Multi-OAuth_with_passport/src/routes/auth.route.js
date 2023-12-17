import { Router } from "express";
import { addLocalUser, googleAuth, loginlocalUser } from "./controller/auth.js";
import passport from "passport";
import GoogleStrategy from "./middlewares/google.js";
import LocalStrategy from "./middlewares/local.js";
import TwitterStrategy from "./middlewares/twitter.js";
import GitHubStrategy from "./middlewares/github.js";
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
  )
  // github routes
  .get("/github", passport.authenticate("github", { scope: ["user:email"] }))

  .get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );
// route for twitter authentication and login
authRouter.get("/twitter", function (req, res, next) {
  req.session.referrer = req.url;
  console.log(req.session);
  passport.authenticate("twitter")(req, res, next);
});

export default authRouter;
