export const getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};
export const homePage = (req, res) => {
  res.render("home", { user: req.user });
};
