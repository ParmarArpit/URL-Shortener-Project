const express = require("express")
const {handleHomePage} = require("../controller/url")
const staticRouter = express.Router()

staticRouter.get("/", handleHomePage)
module.exports = staticRouter