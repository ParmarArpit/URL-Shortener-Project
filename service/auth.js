const setUserMap = new Map()

function setUser(id, user) {
    setUserMap.set(id, user)

}

function getUser(id) {
    return setUserMap.get(id)
}

module.exports = {
    setUser,
    getUser
}