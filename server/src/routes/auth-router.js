import { Router } from "express";
import { authLogin, googleLogin } from "../controllers/auth.controller.js";

const authRouter = Router();
// CUSTOM LOGIN
// GOOGLE LOGIN
authRouter.get("/login", authLogin).get("/google", googleLogin);

export default authRouter;
