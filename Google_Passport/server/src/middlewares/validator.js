export const validateUser = (req, res, next) => {
  console.log("User: ", req.user);
  if (req.user) {
    next();
  }
  res.redirect("/auth/login");
};
