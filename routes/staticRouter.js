const express = require("express");
const URL = require("../model/url");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();

// =============== these will render the EJS file ========================

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // restrictTo here act as inline Middleware

  // Now we do not need below lines as we have alredy do this in the middleware Authorization
  // if (!req.user) {
  //   return res.redirect("/login");
  // }

  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
});

module.exports = router;
