import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.mongo.js";
passport.serializeUser((user, done) => {
  console.log("In serializeUser: ", user);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("In deserializeUser: ", id);
  User.findById(id).then((user) => {
    done(null, user);
  });
});
export default passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ["profile"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google login");
      console.log("Access Token: ", accessToken);
      console.log("Refresh Token: ", refreshToken);
      console.log("Profile: ", profile);
      const { id, displayName } = profile;
      User.findOne({ googleId: id }).then((currentUser) => {
        console.log("In current User: ", currentUser);
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            username: displayName,
            googleId: id,
          })
            .save()
            .then((newUser) => {
              console.log("New User created: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
