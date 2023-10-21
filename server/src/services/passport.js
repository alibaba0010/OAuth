import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
console.log(GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  () => {}
);
