import { Router } from "express";
import { googleAuth } from "./controller/auth.js";

const authRouter = Router();

authRouter.get("/", googleAuth);
export default authRouter;
