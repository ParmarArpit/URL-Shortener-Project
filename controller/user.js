const { setUser } = require("../service/auth");
const User = require("../model/user");
const { v4: uuidv4 } = require("uuid")
async function handleSignUp(req, res) {
    const { Name, email, password } = req.body;
    await User.create({
        Name,
        email,
        password
    })
    res.render("home")  // !

}
async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    })
    if (!user) return res.redirect("/login")
    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie("uid", sessionID);
    res.redirect("/home")

}
function handleSignUpPage(req, res) {
    res.render("signup")
}
function handleLoginPage(req, res) {
    res.render("login")
}

module.exports = { handleSignUp, handleLogin, handleSignUpPage, handleLoginPage }