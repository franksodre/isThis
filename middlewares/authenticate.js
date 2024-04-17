const { verify } = require('jsonwebtoken');

exports.authenticate = async (request, response,next) => {
	const { Authorization } = request.cookies; // sera que devo também validar se o usuario possui um refresh token?

	try {
		if(!Authorization) {
			return response.status(401).json({ msg: 'unathorized' });
		}
		const decoded = verify(Authorization, process.env.SECRET_KEY_TOKEN);
	} catch(e) {
		return response.status(401).json({ msg: 'unathorized click here to login = http://localhost:5000/api/users/login' })
	}
	next();
}