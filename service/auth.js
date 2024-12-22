const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET

function setUser(user) {

    const payload = {
        id : user._id,
        Name : user.Name,
        email : user.email,
        role : user.role
        
    }
    return jwt.sign(payload,JWT_SECRET);
}

function getUser(token) {
    console.log(token);
    
    if(!token) return null;
    return jwt.verify(token,JWT_SECRET)
}

module.exports = {
    setUser,
    getUser
}