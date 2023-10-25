import pkg, { Types } from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

export default model("User", UserSchema);
