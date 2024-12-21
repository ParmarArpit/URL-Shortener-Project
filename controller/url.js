const { v4: uuidv4 } = require('uuid');
const URL = require("../model/url");
const mongoose = require("mongoose")

async function handleShortIDGeneration(req, res) {
    const shortId = uuidv4().split('-')[0];
    const body = req.body
    const referer = req.get("Referer")
    if (!body) res.redirect(referer)  // exception or error handling must be done here 
    console.log(req.user.id)
    URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        createdBy: req.user.id,
        visitHistory: []
    })
    // const urls = await URL.find({})
    //     res.render("home",{allUrls : urls})
    res.redirect(referer)
}

async function handleRedirect(req, res) {
    const shortid = req.params.shortid;
    const date = new Date()
    const document = await URL.findOneAndUpdate({ shortId: shortid }, { $push: { visitHistory: { timestamp: date.toLocaleString() } } })
    res.redirect(document.redirectUrl)
}

async function handleAnalytics(req, res) {
    const shortid = req.params.shortid;
    const entry = await URL.findOne({ shortId: shortid })

    res.json({ "totalNumberOfClicks": entry.visitHistory.length, "Analytics": entry.visitHistory })

}
// async function handleHomePage(req, res) {
//     if (!req.user) return res.redirect("login")
//     const urls = await URL.find({ createdBy : req.user._id })
//     return res.render("home", { allUrls: urls, Name: req.user.Name })
// }
// async function handleHomePage(req, res) {
//     if (!req.user) return res.redirect("login");
//     console.log("Logged-in user:", req.user);
//     const urls = await URL.find({ createdBy: req.user._id });
//     console.log("URLs for the user:", urls);
//     return res.render("home", { allUrls: urls, Name: req.user.Name });
// }

async function handleHomePage(req, res) {
    if (!req.user) return res.redirect("login");
    try {
        // const userId = new mongoose.Types.ObjectId(req.user.id); // Convert id to ObjectId
        const urls = await URL.find({ createdBy: req.user.id });
        console.log("User:", req.user);
        console.log("URLs:", urls);
        return res.render("home", { allUrls: urls, Name: req.user.Name });
    } catch (err) {
        console.error("Error fetching URLs:", err);
        res.redirect("login");
    }
}
module.exports = {
    handleShortIDGeneration,
    handleRedirect,
    handleAnalytics,
    handleHomePage
}