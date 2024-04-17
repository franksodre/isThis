const jwt = require('jsonwebtoken');
const { hash, genSalt } = require('bcryptjs');

const User = require('../db/models/registrer/User.js');

const generateToken = ({ payload, time }) => {
    return jwt.sign({ payload }, process.env.SECRET_KEY_TOKEN, {
        expiresIn: time,
    })
}

exports.register = async (request,response) => {
    const { name,email,password } = request.body;

    const CheckUserExists = await User.findOne({email});
    if(CheckUserExists){
        return response.status(400).json({ messageError: `user \`${email}\` is already taken` });
    }

    const salt = await genSalt(10);
    const HashedPass = await hash(password,salt);

    const user = new User({
        name,
        email,
        password: HashedPass,
    })
    const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'strict'
    }

    try {
        const accessToken = generateToken({ payload: email, time: '1m' });
        const refreshToken = generateToken({ payload: user._id, time: '1d'});
        const UserSaved = await user.save();

        response.cookie('refreshToken', refreshToken, cookieOptions)
        // .header('Authorization', accessToken)
        .cookie('Authorization', accessToken,{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60,

        })
        .status(201).json({ User: UserSaved._id });

    } catch (e) {
        console.error(e);
        return response.status(400).json({ error: 'Failed to register user' });
    }
}

exports.GET_register = async (request,response) => {
    response.render('register')
}


// login 
// const token = jwt.sign({ id: User._id }, process.env.SECRET_KEY_TOKEN, { expiresIn: '1h' }) 
// // alterar para ser possivel expirar apenas depois de logout
// response.status(201).json({ message: 'Usuário registrado com sucesso!', token });

// module.exports = Router;