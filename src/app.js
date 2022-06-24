const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', require('./routes'));
app.use('/characters', require('./routes/characters'));
app.use('/movies', require('./routes/movies'));
app.use('/genres', require('./routes/genres'));
app.use('/register', require('./routes/auth/register'));
app.use('/login', require('./routes/auth/login'));



module.exports = app;