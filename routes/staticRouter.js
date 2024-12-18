const express = require("express")
const {handleHomePage} = require("../controller/url")
const { handleSignUpPage, handleLoginPage } = require("../controller/user")
const staticRouter = express.Router()

staticRouter.get("/home", handleHomePage)
staticRouter.get("/signup", handleSignUpPage)
staticRouter.get("/login", handleLoginPage)
module.exports = staticRouter           