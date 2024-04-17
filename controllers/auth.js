const jwt = require('jsonwebtoken');
const env = require('dotenv')

exports.auth = async (request,response) => {
  const token = request.query.token;

  console.log(token)

  if(token){
    return response.sendStatus(200);
  };
}

exports.GET_auth = async (request,response) => {
    const token = request.query.token;

    if(!token){
        return response.status(404).json({ message: 'not token' });
    }
    try{
        const decoded = jwt.verify(token , process.env.SECRET_KEY_TOKEN);
         response.send(`<h1>hello user something</h1>`)
    }catch(error){
        return response.status(400).json({ message: 'invalid token' })
    }
}