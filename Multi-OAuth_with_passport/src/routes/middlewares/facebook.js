import passport from "passport";
import FacebookStrategy from "passport-facebook";
export default passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb) => {}
  )
);
