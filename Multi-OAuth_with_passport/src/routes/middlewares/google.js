import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import connection from "../utils/db.js";
import { addUser } from "../controller/auth.js";

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
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await addUser(profile);
        console.log("User .... ", user);
      } catch (error) {
        // return done(null, profile);
        console.log(error);
      }
    }
  )
);

function done(err, data) {
  if (err) {
    process.exit(1);
  }
}
