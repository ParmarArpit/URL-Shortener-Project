const { v4: uuidv4 } = require('uuid');
const URL = require("../model/url");

async function handleShortIDGeneration(req, res) {
    const shortId = uuidv4().split('-')[0];
    const body = req.body
    const referer = req.get("Referer")
    if (!body) res.redirect(referer)  // exception or error handling must be done here 
    URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        createdBy: req.user._id,
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
async function handleHomePage(req, res) {
    if(!req.user) return res.redirect("login")
    const urls = await URL.find({createdBy : req.user._id})
    return res.render("home", { allUrls: urls,Name : req.user.Name })
}
module.exports = {
    handleShortIDGeneration,
    handleRedirect,
    handleAnalytics,
    handleHomePage
}