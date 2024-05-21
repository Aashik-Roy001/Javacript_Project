const express = require("express");
const { handleUserSignup } = require("../controller/user");
const router = express.Router();

router.post("/", handleUserSignup);
exports.module = router;
