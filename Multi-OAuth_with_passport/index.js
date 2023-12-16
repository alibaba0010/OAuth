import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
// import GooleStrategy from "./src/routes/middlewares/google.js";
import path, { join } from "path";
import { fileURLToPath } from "url";
import connection from "./src/routes/utils/db.js";
import authRouter from "./src/routes/auth.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(json()).use(
  session({
    // maxAge: 24 * 60 * 60 * 1000,
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// passport.use(GooleStrategy)
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize()).use(passport.session());

app.use(express.static("public"));
app.use(express.static(join(__dirname + "/node_modules/bootstrap/dist")));

app.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    // res.send(`<h2>You're logged in successfully ${req.user}</h2>`);
    res.json(req.user);
  } else {
    res.sendFile(join(__dirname, "public", "auth.html"));
  }
});
app.use("/auth", authRouter);

connection
  .connect()
  .then((conninfo) => {
    console.log("Connected to DB");
    app.listen(8000, () => {
      console.log("app lis)tening port 8000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to db");
    process.exit(1);
  });
