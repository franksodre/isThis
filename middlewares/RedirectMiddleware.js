exports.redirect = async (request, response, next) => {
	const { refreshToken } = request.cookies;
	if(refreshToken){return response.redirect('http://localhost:5000/');}
	next();
}