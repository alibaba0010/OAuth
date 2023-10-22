import passport from "passport";
export const authLogin = async (req, res) => {
  res.render("login");
};
export const googleLogin = async (req, res) => {
  //handling with passport
  passport.authenticate("");
  res.json({ message: "In google" });
};

export const logout = async (req, res) => {};
