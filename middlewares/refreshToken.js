const { verify } = require('jsonwebtoken');

const { generateToken, generateRefreshToken } = require('../utils/GenerateToken.js');
const createCookie = require('../utils/createCookie.js');
const { cookieOptions_token, cookieOptions_state }  = require('../utils/cookieOptions.js')

exports.refreshToken = async (request, response) => {
	// a verificação aqui é desnecessaria pois há um middleware de authenticação?
	const { refreshToken: token } = request.cookies;
	if(!token){
		return response.status(401).json({msg: "invalid tokens"})
	}
	try{
		const accessToken = generateToken({ payload: '007', time: '1m' }); // the payload in this moment is just for example.
		const refreshToken = generateRefreshToken({ payload: '007', time: '1d' }); // the payload in this moment is just for example.
		// response.header('Authorization', accessToken);
		createCookie({ response: response, name: 'refreshToken', value: refreshToken, options: cookieOptions_token });
		createCookie({ response: response, name: 'Authorization', value: accessToken, options: cookieOptions_token });
		response.status(200).json({msg: "new token created"})
		// message  json
	}catch(error){
		return response.status(401).json({ msg: 'invalid token || refresh token' })
	}
	// return response.status(200).json({ msg: `${accessToken}` });
}