import { Router } from "express";

import passport from "passport";
import passportSetup from "../services/passport.js";
import { getProfile, homePage } from "../controllers/profile.controller.js";
import { validateUser } from "../middlewares/validator.js";

const profileRouter = Router();
profileRouter.get("/", homePage).get("/profile", validateUser, getProfile);
export default profileRouter;
