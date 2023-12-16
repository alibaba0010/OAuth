import LocalStrategy from "passport-local";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
export default passport.use(
  new LocalStrategy(
    { usernameField: "emaillog", passwordField: "passwordlog" },
    (email, password, done) => {}
  )
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
