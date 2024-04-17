const jwt = require('jsonwebtoken');
const generateToken = require('../utils/GenerateToken');

const cookieOptions = {
	httpOnly: true,
	sameSite: 'strict',
	maxAge: 1000 * 60,
}

exports.refreshToken = async (request, response,next) => {
	const { refreshToken: token } = request.cookies;
	if(!token){
		return response.status(404).json({ msg: `any token founded?` });
	}

	try{
		const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
		const accessToken = generateToken({ payload: '007', time: '2m' }); // the payload in this moment is just for example.
		const refreshToken = generateToken({ payload: '007', time: '1d' }); // the payload in this moment is just for example.
		// response.header('Authorization', accessToken);
		response.cookie('Authorization', accessToken, cookieOptions);
		response.cookie('refreshToken', accessToken, cookieOptions);
		return next();
	}catch(error){
		return response.status(401).json({ msg: 'invalid token || refresh token' })
	}
	// return response.status(200).json({ msg: `${accessToken}` });
}