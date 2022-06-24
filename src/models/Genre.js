const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Genre = sequelize.define('genre', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    image : {
        type : DataTypes.STRING,
        defaultValue : 'No image provided'
    }
},
{
    timestamps : false
});

module.exports = Genre ;