import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
// const pool2 = new Pool({
//   database: process.env.db_name,
//   user: process.env.db_user,
//   password: process.env.db_pass,
//   port: 5432,
//   host: process.env.db_host
//   //   ssl: true,
//   //   max: 20, // set pool max size to 20
//   //   idleTimeoutMillis: 1000, // close idle clients after 1 second
//   //   connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
//   //   maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
// });

const localConfig = {
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass,
  port: 5432,
  host: process.env.db_host,
};
class Database {
  constructor(config) {
    this.connection = new Pool(config);
  }
  getConnection() {
    return this.connection;
  }
}

export default new Database(localConfig).getConnection();
