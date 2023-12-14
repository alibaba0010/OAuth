import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
// import GooleStrategy from "./src/routes/middlewares/google.js";
import path, { join } from "path";
import { fileURLToPath } from "url";
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
  res.sendFile(join(__dirname, "public", "auth.html"));
});
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("app listening port 8000");
});
