const jwt = require('jsonwebToken')
const nodeMailer = require('nodemailer')
const { compare } = require('bcryptjs');
const env = require('dotenv')

const { generateToken, generateRefreshToken } = require('../utils/GenerateToken.js');
const createCookie = require('../utils/createCookie.js');
const { ServerValidationError } = require('../errors/index.js');
const { cookieOptions_token, cookieOptions_state }  = require('../utils/cookieOptions.js')

const User = require('../db/models/registrer/User.js');

exports.login = async (request,response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if(!user){
        return response.status(404).json({ msg: "email or password incorrect" }); // alterar a msg
    }

    try{
        const comparePassword = await compare(password, user.password); // os metodos de bcryptjs não retornam throws.
        if(!email || !password){
            return response.status(400).json({msg: "password or email incorrect"})
        }  // tudo isso poderia estar dentro do try.
        if (!comparePassword) {
            throw new ServerValidationError({
                message: "email or password are incorrect",
                statusCode: 403
            })
        }
    }catch(e){
        if(e instanceof ServerValidationError){
            return response.status(e.statusCode).json({msg: e.message})
        }
    }

    const accessToken = generateToken({ payload: email, time: '1m', });
    const refreshToken = generateRefreshToken({ payload: user._id, time: '1d' });

    try {
        response.cookie('refreshToken', refreshToken, cookieOptions_token);
        response.header('Authorization', accessToken);

        const UserSaved = await user.save();
        request.UserSaved = UserSaved;

        createCookie({ response: response, name: 'Authorization', value: accessToken, options: cookieOptions_token });
        response.status(200).json({ User: UserSaved._id })
    } catch (e) {
        console.log(e);
        response.status(401).json({ msg: 'token invalido' });
    }
}

exports.GET_login = async (request,response) => {
    const { email } = request.body;

    const user = User.findOne({ email });

    const locals = {
        title: "InsidePC | Login in your account"
    }
    response.render('login', { locals }); // validation error login
}

/*        response.cookie('accessToken', accessToken,{
            httpOnly: true,
            maxAge: 1000 * 60,
        })
        response.status(201).json({ User: UserSaved._id });*/
