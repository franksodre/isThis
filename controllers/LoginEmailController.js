const jwt = require('jsonwebToken')
const nodeMailer = require('nodemailer')
const env = require('dotenv')

const { generateToken, generateRefreshToken } = require('../utils/GenerateToken.js');
const createCookie = require('../utils/createCookie.js')
const { cookieOptions_token, cookieOptions_state }  = require('../utils/cookieOptions.js')

const User = require('../db/models/registrer/User.js');

exports.loginEmail = async (request,response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if(!user){
        return response.status(400).json({ messageError: 'user doesn\'t exists' }); // alterar a msg
    }

    const accessToken = generateToken({ payload: email, time: '1m' });
    const refreshToken = generateRefreshToken({ payload: user._id, time: '1d' });


    TRANSPORTER = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.Magic_Link_Email, // process.env.Magic_Link_Email
            pass: process.env.Magic_Link_Pass, // process.env.Magic_Link_Pass
        }
    })

    const magicLink = `http://localhost:5000/api/users/auth?token=${accessToken}`;
    mailOptions = {
        from: "Mirror@Company",
        to: "franksodrelima@gmail.com",
        subject: 'auth with magic links',
        html: `
        click here to authenticaded
            <a href="${magicLink}">
            <strong>login</strong>
        </a>`,
    }


    TRANSPORTER.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        return response.status(200).json({ message: `email sended to ${email}` })
    })

    try {
        const UserSaved = await user.save();
        request.UserSaved = UserSaved;
        response.cookie('refreshToken', refreshToken, cookieOptions_token)
        .header('Authorization', accessToken)

        createCookie({ response: response, name: 'Authorization', value: accessToken, options: cookieOptions_token })
        .status(200).json({ User: UserSaved._id });
    } catch (e) {
        console.log(e);
        response.status(401).json({ msg: 'token invalido' });
    }
}

exports.GET_login = async (request,response) => {
    response.render('login')
}

/*        response.cookie('accessToken', accessToken,{
            httpOnly: true,
            maxAge: 1000 * 60,
        })
        response.status(201).json({ User: UserSaved._id });*/
