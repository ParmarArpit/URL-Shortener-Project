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
    res.render("login")  // !

}
async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    })
    console.log("user found : ",user);
    
    if (!user) return res.redirect("/login")
    const token = setUser(user)
    
    res.cookie("authToken", token)
    console.log("token sent : ",token);
    
    res.redirect("/home")

}
function handleSignUpPage(req, res) {
    res.render("signup")
}
function handleLoginPage(req, res) {
    res.render("login")
}

module.exports = { handleSignUp, handleLogin, handleSignUpPage, handleLoginPage }