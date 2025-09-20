const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const authMiddleware = async (req,res,next)=>{
    try {
        const {token} = req.cookies

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message : "invalid token. Pleasde login Again"
            })
        }

        const user = await userModel.findById(decoded.id)
        next()

        if(!user){
            return res.status(401).json({
                message : "user not found"
            })
        }

        req.user = user


    } catch (error) {
        return res.status(401).json({
            message: `Authentication failed: ${error.message}`
        });
    }
}

module.exports = authMiddleware