const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
    return res.json({msg : 'Welcome to the api'});
})

module.exports = app;