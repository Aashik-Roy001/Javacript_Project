const express = require("express");

const path = require("path");
const port = 8001;
const app = express();
const { connectToMongoDB } = require("./connect");
const URL = require("./model/url");
const cookieParser = require("cookie-parser");
// const { restrictedToLoginUserOnly, checkAuth } = require("./middleware/auth");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

// ==================registering the routes ==================

const urlRoute = require("./routes/urlRouter");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

// ================= connecting with mongoDb ====================

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("connected to MongoDB");
});

// ========== set the view Engine =========================

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

// =========== usign the middleware =======================
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: false })); // to parse the form data
app.use(cookieParser()); // for parsing the cookie
app.use(checkForAuthentication);
// ============== using the routes ========================

// app.use("/url", restrictedToLoginUserOnly, urlRoute); // restrictToLoginUserOnly will ensure that only logged in user will allowed to user our app
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
// app.use("/", checkAuth, staticRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log("Server started");
});
