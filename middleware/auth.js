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

// The Problem with statefull atuhentication is that :- (Born of Stateless Authentication)
// =======================================================

// 1) If the server restart or state loss for some reason then all the user will atuomatically logout
// 2)  Statefull Authentication is memory -intensive i.e it uses our server memory but server has only limited memory

// Solution using JWT token :
//===========================================================

// To solve these Problems we need "STATELESS AUTHENTICATION"

// Before this in Statefull Athentication we note the iser data in server(like in diary) and give the ticket ? token to the user

// But in Stateless Authentication we will not save the data in the server rather
// we will note the user data along with the token / ticket provided to the user and will apply a stamp on that ticket so that
// everyone can only read the ticket but not write/ duplicate
// For giving stamp  to the ticket we will use "JWT Authentication" / "JWT Token"

// we will use this toekn and put this in the user's cookies

// we will use a library i.e "JSONwebtoken"

// Those who will have the "SecretKey" can only chnage the token and can hack the user data and crash your app

// We use Tokens when we need longer session for the user
// we use SessionId when we shorter session for the user(Like in banking application)
