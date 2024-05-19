const mongoose = require("mongoose");

// =================== create schema ===========================

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamp: true }
);

// ====================== create Model ==============================

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
