import { Router } from "express";

import { getProfile, homePage } from "../controllers/profile.controller.js";
import { validateUser } from "../middlewares/validator.js";

const profileRouter = Router();
profileRouter.get("/", homePage).get("/profile", validateUser, getProfile);
export default profileRouter;
