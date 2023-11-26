import passport from "passport";
export const authLogin = (req, res) => {
  console.log("User login: ", req.user);
  res.render("login", { user: req.user });
};
export const googleLogin = (req, res) => {
  //handling with passport
  passport.authenticate("");
  res.json({ message: "In google" });
};

export const logout = (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/");
};

export const googleRedirect = (req, res) => {
  console.log(req.user);
  res.redirect("/profile");
};
