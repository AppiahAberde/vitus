const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'tbl_cardsworldagents_logins', {
        _id: {
            type: Sequelize.INTEGER,
            primaryKey: true           
        },
        username: {
            type: Sequelize.STRING 
        },
        constituencyNo : {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps:false
    }
)