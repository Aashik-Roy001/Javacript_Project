const sessionIdMapToUser = new Map();

// these will act as a diary which will note all the useId with theirs session for state mangement

function setUser(id, user) {
  sessionIdMapToUser.set(id, user);
}

function getUser(id) {
  return sessionIdMapToUser.get(id);
}

module.exports = {
  setUser,
  getUser,
};
