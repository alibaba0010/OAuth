import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

export default passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Profile is .....", JSON.stringify(profile));
      return done(null, profile);
    }
  )
);

function done(err, data) {
  if (err) {
    process.exit(1);
  }
}
