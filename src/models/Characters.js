const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');


const Character = sequelize.define('characters',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image : {
        type: DataTypes.STRING,
        defaultValue: 'No image provided',
    },
    name : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    weight : {
        type : DataTypes.FLOAT,
        defaultValue : 'No weight specified'
    },
    history : {
        type : DataTypes.TEXT,
        defaultValue : 'No history provided'
    }

}, {
    timestamps : false,
})
module.exports = Character ; 