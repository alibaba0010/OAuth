import TwitterStrategy from "passport-twitter";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { getUserByUserId } from "../utils/Query.js";
import { addUser } from "../controller/auth.js";
export default passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: "http://127.0.0.1:8000/auth/twitter/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Profile id", profile);
        //   console.log("Access token: ", accessToken);
        //   console.log("Refresh token: ", refreshToken);
        const checkIfUserExists = await connection.query(getUserByUserId, [
          profile.id,
        ]);
        if (checkIfUserExists.rows[0]) {
          console.log("user Exists", checkIfUserExists.rows[0]);
          return done(null, checkIfUserExists.rows[0]);
        }
        const user = await addUser(profile);
        console.log("New user", user);
        return done(null, user);
      } catch (error) {
        return done(error);
        console.log(error);
      }
    }
  )
);
