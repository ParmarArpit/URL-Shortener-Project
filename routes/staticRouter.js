const express = require("express")
const { handleHomePage, handleAdminPage } = require("../controller/url")
const { handleSignUpPage, handleLoginPage } = require("../controller/user")
const { restrictTo } = require("../middlewares/auth")

const staticRouter = express.Router()
staticRouter.get("/home", handleHomePage)
staticRouter.get("/signup", handleSignUpPage)
staticRouter.get("/login", handleLoginPage)
staticRouter.get("/admin/urls",restrictTo(["ADMIN"]),handleAdminPage)
module.exports = staticRouter       