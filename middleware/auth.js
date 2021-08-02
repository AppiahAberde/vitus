const User = require('../models/Login')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "")
        const decoded = jwt.verify(token, "mysecret")
        const user = await User.findOne({
            where: {
                _id: decoded._id
            }
        })
        if (!user) throw new Error()
        //req.token = token
        req.user = user
        //console.log(req.user)
        next()
    } catch (error) {
        res.render('index')
        //res.status(401).send('Please authorize')
    }
}

module.exports = auth