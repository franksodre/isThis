const { verify } = require('jsonwebtoken');

exports.authenticate = async (request, response,next) => {
	const { Authorization, refreshToken } = request.cookies; // sera que devo também validar se o usuario possui um refresh token?

	if(!Authorization) {
		return response.status(401).json({ msg: 'unathorized' });
	}

	try {
		const decoded = verify(Authorization, process.env.SECRET_KEY_TOKEN);
		console.log(decoded)
		// const decoded = verify(refreshToken, process.env.SECRET_KEY_RTOKEN);
		// next()
	} catch(e) {
		return response.status(401).json({ msg: 'unathorized click here to login = http://localhost:5000/api/users/login' })
	}
	next();
}

// isto esta errado seria refreshToken?