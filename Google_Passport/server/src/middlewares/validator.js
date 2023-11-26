export const validateUser = (req, res, next) => {
  console.log("User..: ", req.session.session);
  if (req.user) {
    next();
  }
  res.redirect("/auth/login");
};
