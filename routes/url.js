const express = require("express")
const { handleShortIDGeneration, handleRedirect, handleAnalytics } = require("../controller/url")
const urlRouter = express.Router()
urlRouter.post("/", handleShortIDGeneration)
urlRouter.get("/:shortid", handleRedirect)
urlRouter.get("/analytics/:shortid", handleAnalytics)
module.exports = urlRouter