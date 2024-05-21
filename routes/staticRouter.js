const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return response.render("home");
});

module.exports = router;
