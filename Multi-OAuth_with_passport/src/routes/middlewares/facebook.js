import passport from "passport";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
dotenv.config();
export default passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "picture.type(large",
        "email",
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Profile", profile);
      return done(null, profile);
    }
  )
);
