const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Characters = require('./Characters');
const Genre = require('./Genre');


const Movies = sequelize.define('movies', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    image : {
        type : DataTypes.STRING,
        allowNull : false,

    },
    date : {
        type : DataTypes.DATEONLY,
        allowNull : false

    },
    rate : {
        type : DataTypes.FLOAT,
        allowNull : false
    }
}, {
    timestamps : false
})

Movies.belongsToMany(Characters, { through : 'charPerMovie'});
Characters.belongsToMany(Movies, { through : 'charPerMovie'});
Genre.hasMany(Movies);
Movies.belongsTo(Genre);

module.exports = Movies;
