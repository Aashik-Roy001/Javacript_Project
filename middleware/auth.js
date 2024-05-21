const { getUser } = require("../Service/auth");

async function restrictedToLoginUserOnly(req, res, next) {
  const userId = req.cookies?.uid; // we also hve to install cookie-parser to parse the cookies

  if (!userId) {
    return res.redirect("/login");
  }
  const user = getUser(userId);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userId = req.cookies?.uid; // we also hve to install cookie-parser to parse the cookies
  const user = getUser(userId);
  req.user = user;
  next();
}

module.exports = {
  restrictedToLoginUserOnly,
  checkAuth,
};
