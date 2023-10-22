import passport from "passport";

export const passportMiddleware = () => {
  passport.authenticate("google", {
    scope: [""],
  });
};
