const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET

function setUser(user) {
    console.log(user._id)
    console.log(user.email)
    console.log(user.Name)

    const payload = {
        id : user._id,
        Name : user.Name,
        email : user.email
        
    }
    return jwt.sign(payload,JWT_SECRET);
}

function getUser(token) {
    
    if(!token) return null;
    return jwt.verify(token,JWT_SECRET)
}

module.exports = {
    setUser,
    getUser
}