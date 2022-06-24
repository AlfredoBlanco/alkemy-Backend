const { Router } = require('express');
const Users = require('../../models/Users');
const { SECRET } = require('../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = Router();

app.post('/', async ( req, res ) => {
    try{

        const { email, password } = req.body;
        
        const user = await Users.findOne({
            where : { email }
        });

        if( !user ) return res.json({msg : 'Email or password invalid'});
        
        const check = await bcrypt.compare(password, user.dataValues.password);
        
        if ( !check ) return res.json({msg : 'Email or password invalid'})

        const token = jwt.sign({ email }, SECRET, { expiresIn : '10h'});
        
        res.json({token});
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
})



module.exports = app;