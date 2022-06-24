const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const bcrypt = require('bcrypt');


const Users = sequelize.define('users', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        set( value ){
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync( value, salt);

            this.setDataValue('password', passwordHash);

        }
    }

});

module.exports = Users;