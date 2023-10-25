export const validateUser = (req, res, next) => {
  if (req.user) next();
  res.redirect("/auth/login");
};
