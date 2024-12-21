const express = require("express")
const { handleSignUp, handleLogin } = require("../controller/user")
const userRouter = express.Router()

userRouter.post("/signup", handleSignUp)
userRouter.post("/login", handleLogin)
module.exports = userRouter