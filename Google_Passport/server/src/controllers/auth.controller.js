import passport from "passport";
export const authLogin = async (req, res) => {
  res.render("login", { user: req.user });
};
export const googleLogin = async (req, res) => {
  //handling with passport
  passport.authenticate("");
  res.json({ message: "In google" });
};

export const logout = async (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/");
};

export const googleRedirect = async (req, res) => {
  console.log("User: ", req.user);
  res.redirect("/profile");
  res.json({ message: "You're now redirected" });
};
