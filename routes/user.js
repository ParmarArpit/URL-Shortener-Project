const express = require("express")
const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.end("This is home page of Url shortener front-end will be updated soon")

})
module.exports = userRouter