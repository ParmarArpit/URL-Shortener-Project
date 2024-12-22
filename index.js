const express = require("express");
const { connectToMongoDB } = require("./connection");
const path = require("path");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
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
app.use(checkForAuthentication)

//Registering Routes ;
app.use("/url",restrictTo(["NORMAL"]),urlRouter);
app.use("/user",userRouter);
app.use("/",staticRouter);

//Specifying view engine 
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => console.log("Server Started At", PORT));