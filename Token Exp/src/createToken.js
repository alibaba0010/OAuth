import { Router } from "express";
import { pool } from "./services/db.js";
import { checkEmailExists } from "./services/Query.js";
import jwt from "jsonwebtoken";
const createToken = Router();
import dotenv from "dotenv";
createToken.post("/user", async (req, res) => {
  const { name, email } = req.body;
  try {
    const checkIfEmailExists = await pool.query(checkEmailExists, [email]);
    if (checkIfEmailExists.rowCount !== 0)
      //  res.status(400).json({ errorMessage: "Email already exists" });
      throw new Error("Email already exists");

    const signInToken = jwt.sign({ email: email }, process.env.JWT_SEC, {
      expiresIn: "1m",
    });
  } catch (error) {
    res.json({ errorMessage: error });
  }
  return signInToken;
});
export default createToken;
