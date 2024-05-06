function createCookie ({ response, name, value, options = {} }){
    return response.cookie(name, value, options)
}

module.exports = createCookie;