const { Router } = require('express');
const Users = require('../../models/Users');
const { Op } = require('sequelize');
const sMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, SENDER } = require('../../config');

const app = Router();
sMail.setApiKey(SENDGRID_API_KEY);

app.post('/', async (req, res) => {
    try{

        const [ , check ] = await Users.findOrCreate({
            where : {
                [ Op.or ] : [
                    { email : req.body.email },
                    { username : req.body.username }
                ]
            },
            defaults : {
                ...req.body
            }
            
        })
        
        if( !check ) return res.json({msg : 'The user or the email already exists'});
        const msg = {
            to: req.body.email,
            from: SENDER, 
            subject: 'Verification email',
            text: 'Thank you for joining our API',
            html: 'Now you are part of our community, enjoy it!',
        };
        await sMail.send(msg);
        
        return res.json({msg : 'User created successfully'});
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
});


module.exports = app;