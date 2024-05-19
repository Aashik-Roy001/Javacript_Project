const express = require("express");

const app = express();
const port = 8001;
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/urlRouter");
const URL = require("./model/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("connected to MongoDB");
});

app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
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
