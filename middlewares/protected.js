exports.protected =  async (request, response, next) => {
	const { refreshToken } = request.cookies;

	if(!refreshToken){
		return response.redirect('register')
	}
	next()
}