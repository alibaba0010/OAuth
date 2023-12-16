import bcrypt from "bcrypt";
import connection from "../utils/db.js";
import { addUsers, getAllUsersQuery, getUserById } from "../utils/Query.js";
export const googleAuth = async (req, res) => {
  res.send("google is here");
};

//  const addGoggleUser = async (req, res) => {};

export const addUser = async (profile) => {
  const { id, provider, displayName, username } = profile;
  const userExists = await connection.query(getUserById, [id]);
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
    const hashedPassword = await bcrypt.hash(id, salt);
  } catch (error) {}
};
