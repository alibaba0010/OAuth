import { Router } from "express";
import { pool } from "./services/db.js";
import { addUsers, checkEmailExists } from "./services/Query.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateUser } from "./services/verify.js";
dotenv.config();
const verifyToken = Router();

verifyToken.get("/verify", authenticateUser, (req, res) => {
  res.json({ message: req.user });
});

export default verifyToken;
