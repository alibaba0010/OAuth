import TwitterStrategy from "passport-twitter";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { checkEmailExists, getUserById } from "../utils/Query.js";
export default passport.use(
  new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: "/auth/twitter/callback",
  })
);

new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!user.verifyPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
});
