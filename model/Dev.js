const { DataTypes } = require('sequelize')

const db = require('../db/connect')

const User = require('./User')

const Dev = db.define('Dev', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Dev.belongsTo(User)
User.hasMany(Dev)


module.exports = Dev

