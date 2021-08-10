const JWT = require('jsonwebtoken');
const config = require('../config/config');


function issueJWT(user) {
    const id = user.id;

    const expiresIn = '5h';

    const payload = {
        sub: id,
        iat: Date.now()
    };

    const signedToken = JWT.sign(payload, 'secret', { expiresIn: expiresIn });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

function getUserId(req) {
    const token = req.headers.authorization.split(' ')[1]; // on récupère le token de la requête entrante
    const decodedToken = JWT.verify(token, 'secret'); // on le vérifie
    const userId = decodedToken.sub;
    return userId; // on récupère l'id du token
}



module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;

/* { userId: userJson.id },
          'JWT_SECRET',
          { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 } */
//         Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdW…DE3fQ.80sqaWWClW7Psb68w5S9sqk9hK4ABOpnackRTvdMkNQ