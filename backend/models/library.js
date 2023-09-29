const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const LibraryManagement = sequelize.define('libraryManagement' , {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    bookName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    returned : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    fine :{
        type : Sequelize.INTEGER,
        allowNull : false

    }
})

module.exports = LibraryManagement;