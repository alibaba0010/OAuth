import bcrypt from "bcrypt";
import connection from "../utils/db.js";
import { v4 as uuidv4 } from "uuid";
import { addUsers, getAllUsersQuery, getUserByUserId } from "../utils/Query.js";
import passport from "passport";
export const googleAuth = async (req, res) => {
  res.send("google is here");
};

//  const addGoggleUser = async (req, res) => {};

export const addUser = async (profile) => {
  const { id, provider, displayName, username } = profile;
  const userExists = await connection.query(getUserByUserId, [id]);
  if (userExists.rowCount == 0) {
    // if user doesn't exist
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(id, salt);
    const user_id = id;
    // const user_id = "23";
    const full_name = displayName || username || null;
    const email = profile["_json"].email || null;

    try {
      const user = await connection.query(addUsers, [
        user_id,
        provider,
        email,
        hashedPassword,
        full_name,
      ]);
      return user;
    } catch (error) {
      return error;
    }
  } else {
    return "User already eists";
  }
};
export const addLocalUser = async (req, res) => {
  const { password, fullname, email } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const full_name = fullname;
    const user = await connection.query(addUsers, [
      uuidv4().toString(),
      "local",
      email,
      hashedPassword,
      full_name,
    ]);
    res.status(200).json({
      success: true,
      message: "You've succesfuly registered you can login now",
    });
  } catch (error) {
    res.json({
      success: false,
      errorMessage: "Error occurred",
    });
  }
};

export const loginlocalUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(403).json({
        success: false,
        errorMessage: "Wrong email or password",
      });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: "Login successfully",
      });
    });
  })(req, res, next);
};
