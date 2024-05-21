// Now we don't need below lines as we are not maintaing the state and using JWT token
//==================================================================

//const sessionIdMapToUser = new Map();

const jwt = require("jsonwebtoken");
const secretKey = "aashikRoy01@A";

// these will act as a diary which will note all the useId with theirs session for state mangement

function setUser(user) {
  //   Now we don't need below line
  //   sessionIdMapToUser.set(id, user);

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }

  // I am using try and catch so that if someone want to hack the user data then app don't get crash
  // and return "null"

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
