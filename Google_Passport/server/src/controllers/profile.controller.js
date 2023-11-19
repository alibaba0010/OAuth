export const getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};
export const homePage = (req, res) => {
  console.log("User2", req.user);
  res.render("home", { user: req.user });
};
