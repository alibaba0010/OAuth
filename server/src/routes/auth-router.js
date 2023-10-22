import { Router } from "express";
import {
  authLogin,
  googleLogin,
  logout,
} from "../controllers/auth.controller.js";
import { passportMiddleware } from "../middlewares/passport-middleware.js";
const authRouter = Router();
authRouter
  // CUSTOM LOGIN
  .get("/login", authLogin)
  // GOOGLE LOGIN
  .get("/google", passportMiddleware, googleLogin)
  //LOGOUT
  .get("/logout", logout);

export default authRouter;
