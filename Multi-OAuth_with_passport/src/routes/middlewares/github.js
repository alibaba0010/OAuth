import passport from "passport";
import GitHubStrategy from "passport-github2";
import { addUser } from "../controller/auth.js";
import connection from "../utils/db.js";
import { getUserByUserId } from "../utils/Query.js";

export default passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Access token: ", accessToken);
      console.log("Refresh token: ", refreshToken); // undefined
      try {
        const checkIfUserExists = await connection.query(getUserByUserId, [
          profile.id,
        ]);
        if (checkIfUserExists.rows[0]) {
          return done(null, checkIfUserExists.rows[0]);
        }
        const user = await addUser(profile);
        console.log("User in github", user);
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
