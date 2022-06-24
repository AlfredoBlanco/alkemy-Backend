const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:Alfredo@localhost:5432/ChallengeBE`);


module.exports = { sequelize };