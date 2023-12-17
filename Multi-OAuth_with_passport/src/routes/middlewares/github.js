import passport from "passport";
import GitHubStrategy from "passport-github2";
import { addUser } from "../controller/auth.js";
export default passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        await addUser(profile);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
