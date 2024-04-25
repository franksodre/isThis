const cookieOptions_token = { httpOnly: true, maxAge: 1000 * 60 * 60, sameSite: 'strict' };
const cookieOptions_state = { httpOnly: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 };

module.exports = { cookieOptions_token, cookieOptions_state }