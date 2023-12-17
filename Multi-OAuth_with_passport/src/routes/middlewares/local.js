import LocalStrategy from "passport-local";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { checkEmailExists } from "../utils/Query.js";
export default passport.use(
  new LocalStrategy(
    { usernameField: "emaillog", passwordField: "passwordlog" },
    async (email, password, done) => {
      const checkUser = await connection.query(checkEmailExists, [email]);
      try {
        if (checkUser.rowCount == 0) {
          // not yet registered
          return done(null, false);
        } else {
          const checkPassword = await bcrypt.compare(
            password,
            checkUser.rows[0].password
          );
          if (!checkPassword) return done(null, false);
          return done(null, checkUser.rows[0]);
        }
      } catch (error) {
        return done(error);
      }
    }
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
