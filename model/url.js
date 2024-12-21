const mongoose = require("mongoose")
const urlSchema = mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectUrl: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  visitHistory: [{ timestamp: { type: String } }]
}, { timestamps: true })

const URL = mongoose.model("url", urlSchema)
module.exports = URL