import { Router } from "express";

import passport from "passport";
import passportSetup from "../services/passport.js";
import { getProfile } from "../controllers/profile.controller.js";

const profileRouter = Router();
profileRouter.get("/profile", getProfile);
export default profileRouter;
