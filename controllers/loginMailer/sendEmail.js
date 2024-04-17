const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer')
const env = require('dotenv')

const { generateToken } = require('../../utils/GenerateToken.js');

const token = generateToken({ payload: email, time: '1m' })

exports.TRANSPORTER = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'omer90@ethereal.email', // process.env.Magic_Link_Email
        pass: 'STvcuH5EybA4QcT3jk', // process.env.Magic_Link_Pass
    }
})

const magicLink = `http://localhost:5000/api/users/auth?token=${token}`;

exports.mailOptions = {
    from: process.env.Magic_Link_Email,
    to: email,
    subject: 'auth with magic links',
    html: `
    click here to authenticaded
        <a href="${magicLink}">
        <strong>login</strong>
    </a>`,
}

