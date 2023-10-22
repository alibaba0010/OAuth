import passport from "passport";
import passportSetup from "../services/passport.js";
export const passportMiddleware = () => {
  passport.authenticate("google", {
    scope: ["profile"],
  });
};
