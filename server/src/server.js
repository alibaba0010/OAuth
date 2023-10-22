import { createServer } from "http";
import dotenv from "dotenv";
import connectDB from "./services/db.js";
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 2003;
const uri = process.env.MONGO_URL;
const server = createServer(app);

(async () => {
  await connectDB(uri);
  server.listen(PORT, () =>
    console.log(`Listening to port @ http://localhost:${PORT}`)
  );
})();
