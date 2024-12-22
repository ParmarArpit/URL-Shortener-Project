const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
    const authenticationTokenValue = req.cookies?.authToken;
    console.log("checauth token : ",authenticationTokenValue);
    
    if(!authenticationTokenValue)
        return next();
    const token = authenticationTokenValue;
    const user = getUser(token)
    req.user = user;
    console.log("checkauth user : ",user)
    return next();
}
// function checkForAuthentication(req,res,next){
//     const authenticationTokenValue = req.cookie?.authToken;
//     if(!authenticationTokenValue || authenticationTokenValue.startsWith("Bearer"))
//         return next()
//     const token = authenticationTokenValue.split("Bearer ")[1];
//     const user = getUser(token)
//     req.user = user;
//     return next();
// }

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect("login")
        
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized Access")

        return next();


    }

}
// async function restrictToLoggedInUserOnly(req, res, next) {
//     const userUid = req.headers["authorization"];
//     console.log("userUid restrict : ",userUid);
    
//     if (!userUid) return res.redirect("/login")
//     const token = userUid.split("Bearer ")[1]
//     const user = getUser(token);
//     console.log(user)
//     if (!user) return res.redirect("/login")
//     req.user = user;
//     next();

// }
// async function checkAuth(req, res, next) {
//     const userUid = req.headers["authorization"];
    
//     console.log("token of check auth ",userUid);
//     const token = userUid.split("Bearer ")[1]
//     const user = getUser(token);
//     req.user = user
//     next();

// }

module.exports = {
    checkForAuthentication,
    restrictTo
}