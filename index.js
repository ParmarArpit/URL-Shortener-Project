const express = require("express");
const { connectToMongoDB } = require("./connection")
const path = require("path")
const userRouter = require("./routes/user")
const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
require("dotenv").config()
const app = express();
const PORT = 8001;

const MONGO_URI = process.env.MONGO_URI

connectToMongoDB(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/home", staticRouter)
app.use("/url", urlRouter)
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.listen(PORT, () => console.log("Server Started At", PORT))