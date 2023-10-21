import { Router } from "express";
import {
  authLogin,
  googleLogin,
  logout,
} from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter
  // CUSTOM LOGIN
  .get("/login", authLogin)
  // GOOGLE LOGIN
  .get("/google", googleLogin)
  //LOGOUT
  .get("/logout", logout);

export default authRouter;
