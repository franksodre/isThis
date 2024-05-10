const jwt = require('jsonwebtoken');

function generateToken ({ payload, time }){
    return jwt.sign({ payload }, process.env.SECRET_KEY_TOKEN, {
        expiresIn: time,
    })
}
function generateRefreshToken ({ payload, time }){
    return jwt.sign({ payload }, process.env.SECRET_KEY_RTOKEN, {
        expiresIn: time,
    })
}

module.exports = {
    generateToken,
    generateRefreshToken
};