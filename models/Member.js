const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'tbl_party_members_public', {        
        fname: {
            type: Sequelize.STRING 
        },
        lname : {
            type: Sequelize.STRING
        },
        oname: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }, 
        party_id : {
            type: Sequelize.STRING
        }, 
        const_name: {
            type: Sequelize.STRING
        },
        region_name: {
            type: Sequelize.STRING
        },
        branch_name:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps:false, freezeTableName: true
    }
)