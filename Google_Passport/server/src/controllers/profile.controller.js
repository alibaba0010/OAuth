export const getProfile = async (req, res) => {
  res.render("profile", { user: req.user });
};
export const homePage = async (req, res) => {
  res.render("home", { user: req.user });
};
