const { verify } = require('jsonwebtoken');

exports.LoginAuth = async (request, response,next) => {
	const { refreshToken } = request.cookies; // sera que devo também validar se o usuario possui um refresh token?
	if(refreshToken) {
		return response.status(401).json({ msg: 'User already logged' }); // alterar msg para fins de security
	}
	// try {

	// 	const decoded = verify(refreshToken, process.env.SECRET_KEY_TOKEN);
	// } catch(e) {
	// 	return response.status(401).json({ msg: 'Invalid Token' })
	// }
	next();
}