import { Router } from "express";
import { pool } from "./services/db.js";
import { addUsers, checkEmailExists } from "./services/Query.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createToken = Router();

createToken.post("/user", async (req, res) => {
  const { name, email } = req.body;
  try {
    const checkIfEmailExists = await pool.query(checkEmailExists, [email]);
    if (checkIfEmailExists.rowCount !== 0)
      res.status(400).json({ errorMessage: "Email already exists" });
    // throw new Error("Email already exists");
    const addUser = await pool.query(addUsers, [name, email]);
    const signInToken = jwt.sign({ email: email }, process.env.JWT_SEC, {
      expiresIn: "1m",
    });
    req.session = {
      jwt: signInToken,
    };
    res
      .status(201)
      .json({ message: "User successfully crweated", signInToken });
  } catch (error) {
    console.log(error);
  }
  //   return signInToken;
});
export default createToken;
