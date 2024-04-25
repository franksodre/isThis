const { verify } = require('jsonwebtoken');

exports.authRefreshToken = async (request, response,next) => {
	const { RefreshToken } = request.cookies; // sera que devo também validar se o usuario possui um refresh token?

	try {
		if(!RefreshToken) {
			return response.status(401)
		}
		const decoded = verify(RefreshToken, process.env.SECRET_KEY_TOKEN);
	} catch(e) {
		return response.status(401).json({ msg: 'unathorized click here to login = http://localhost:5000/api/users/login' })
	}
	next();
}