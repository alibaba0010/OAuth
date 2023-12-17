import TwitterStrategy from "passport-twitter";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { checkEmailExists, getUserById } from "../utils/Query.js";
export default passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: "/auth/twitter/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await addUser(profile);
        return done(null, user);
      } catch (error) {
        return done(error);
        console.log(error);
      }
    }
  )
);
