import { Router } from "express";

const authRouter = Router();
authRouter.get("/", (req, res) => {
  res.render("/home");
});

export default authRouter;
