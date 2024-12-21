const express = require("express");
const { connectToMongoDB } = require("./connection");
const path = require("path");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
require("dotenv").config();
const app = express();
const PORT = 8001;

const MONGO_URI = process.env.MONGO_URI;

//Connecting to MongoDB
connectToMongoDB(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Registering Routes ;
app.use("/url",restrictToLoggedInUserOnly,urlRouter);
app.use("/user",userRouter);
app.use("/",checkAuth, staticRouter);

//Specifying view engine 
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => console.log("Server Started At", PORT));