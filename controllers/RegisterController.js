const jwt = require('jsonwebtoken');
const { hash, genSalt } = require('bcryptjs');

const User = require('../db/models/registrer/User.js');
const { generateToken, generateRefreshToken } = require('../utils/GenerateToken.js');
const createCookie = require('../utils/createCookie.js');
const { cookieOptions_token, cookieOptions_state } = require('../utils/cookieOptions.js');

exports.register = async (request, response) => {
    const { name, email, password } = request.body;

    const CheckUserExists = await User.exists({ email });
    if (CheckUserExists){
        return response.status(400).json({ msg: `user \`${email}\` is already taken` });
    }

    const salt = await genSalt(10);
    const HashedPass = await hash(password, salt);

    const user = new User({ // I can use create mongoose method;
        name,
        email,
        password: HashedPass,
    })

    try {
        const accessToken = generateToken({ payload: email, time: '1m' });
        const refreshToken = generateRefreshToken({ payload: user._id, time: '1d' });
        const UserSaved = await user.save();

        response.cookie('refreshToken', refreshToken, cookieOptions_token)
        // .header('Authorization', accessToken)
        createCookie({ response: response, name: 'Authorization', value: accessToken, options: cookieOptions_token })
        .status(201).json({ User: UserSaved._id })
        // deve ser trabalhada
    } catch (e) {
        console.error(e);
        return response.status(400).json({ error: 'Failed to register user' });
    }
}

exports.GET_register = async (request, response) => {
    const locals = {
        title: "InsidePC | Register"
    }
    response.render('register', { locals }); // validation error register;
}


// login
// const token = jwt.sign({ id: User._id }, process.env.SECRET_KEY_TOKEN, { expiresIn: '1h' })
// // alterar para ser possivel expirar apenas depois de logout
// response.status(201).json({ message: 'Usuário registrado com sucesso!', token });

// module.exports = Router;
