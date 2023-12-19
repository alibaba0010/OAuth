import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
export const pool = new Pool({
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass,
  port: 5432,
  host: process.env.db_host,
});
