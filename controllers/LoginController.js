const jwt = require('jsonwebToken')
// const 'bcrypt' = require('bcryptjs')
const nodeMailer = require('nodemailer')
const env = require('dotenv')

const generateToken = require('../utils/GenerateToken.js')
// const { TRANSPORTER, mailOptions } = require('./loginMailer/sendEmail.js')

const User = require('../db/models/registrer/User.js');

exports.login = async (request,response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if(!user){
        return response.status(400).json({ messageError: 'user doesn\'t exists' });
    }

    const accessToken = generateToken({ payload: email, time: '1m' });
    const refreshToken = generateToken({ payload: user._id, time: '1d'});


    TRANSPORTER = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dangelo.schinner0@ethereal.email', // process.env.Magic_Link_Email
            pass: '7Mt9HEnzj7csmdRg5F', // process.env.Magic_Link_Pass
        }
    })

    const magicLink = `http://localhost:5000/api/users/auth?token=${accessToken}`;
    mailOptions = {
        from: process.env.Magic_Link_Email,
        to: email,
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

    const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'strict'
    }

    try {
        const UserSaved = await user.save();
        request.UserSaved = UserSaved;
        response.cookie('refreshToken', refreshToken, cookieOptions)
        // .header('Authorization', accessToken)
        .cookie('Authorization', accessToken,{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60,

        })
        .json({ User: UserSaved._id });
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