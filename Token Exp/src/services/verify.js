import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authenticateUser = async (req, res, next) => {
  const { jwt: token } = req.session;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SEC);
      // if (decode.exp < Date.now() / 1000) {
      //   throw new UnauthenticatedError("Token has expired");
      // }
      req.user = { email: decode.email };
      console.log("user: ", req.user);

      next();
    } catch (err) {
      req.session = null;
      console.log("Unable to authorize access, login again");
    }
  } else {
    return res.status(403).send({ message: "No token provided" });
  }
};
