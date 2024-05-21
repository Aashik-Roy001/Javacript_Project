const User = require("../model/user");
// we are using uuid for generating session id for the user in order to manage the state of the user
const { v4: uuidv4 } = require("uuid");

const { setUser } = require("../Service/auth");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const userAuth = await User.findOne({ email, password });

  if (!userAuth) {
    return res.render("login", { error: "Invalid Username or Password" });
  }

  const sessionId = uuidv4();
  res.cookie("uid", sessionId);

  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
