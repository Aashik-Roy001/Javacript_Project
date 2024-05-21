const express = require("express");

const app = express();
const path = require("path");
const port = 8001;
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/urlRouter");
const staticRoute = require("./routes/staticRouter");
const URL = require("./model/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("connected to MongoDB");
});

// ========== set the view Engine =========================
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

// =========== usign the middleware =======================
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: false })); // to parse the form data
// ============== using the routes ========================
app.use("/url", urlRoute);
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
