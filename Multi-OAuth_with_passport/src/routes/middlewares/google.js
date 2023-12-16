import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import connection from "../utils/db.js";

dotenv.config();

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
  // user.id is going to req.session.passport.user
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  // User.findById(id, function (err, user) {
  done(null, user);
  // });
});

export default passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Profile is .....", profile);
      return done(null, profile);
    }
  )
);

function done(err, data) {
  if (err) {
    process.exit(1);
  }
}
