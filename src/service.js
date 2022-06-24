const { SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const validate = async (req, res, next) => {
    try{
        //Vamos por aplicar el middleware a las otras rutas y esperar que este todo bien
        const [ ,token ] =  req.headers['authorization']?.split(' ');

        if( !token ) return res.json({msg : 'No token provided'});

        let user = '';
        let err = '';

        jwt.verify(token, SECRET, (error, decoded) => {
            err = error;
            user = decoded;
        })
        if( err ) return res.json({msg : 'Wrong or expired token'});

        req.user = user;
        return next();

    } catch(e) {
        res.send(e);
    }
}

module.exports = validate;