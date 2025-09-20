const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerController = async (req,res)=>{
    try {
        const {username , email , password} = req.body

        const existingUser = await userModel.findOne({
            $or : [
                {username },
                {email }
            ]
        })

        if(existingUser){
            return res.status(400).json({
                message : "user already exist. Try again"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)
        const user = await userModel.create({username , email , password : hashedPassword})

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(201).json({
            message: 'user created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(400).json({
            message : `error creating user : ${error.message}`
        })
    }
}

const loginController = async (req,res)=>{
    try {
        const {credential , password} = req.body

        const existingUser = await userModel.findOne({
            $or : [
                {username : credential},
                {email : credential}
            ]
        })

        if(!existingUser){
            return res.status(400).json({
                message : "user not found. Please Register!"
            })
        }

        const isPasswordValid = await bcrypt.compare(password , existingUser.password)

        if(!isPasswordValid){
            return res.status(400).json({
                message : "invalid username/email or password. Try Again"
            })
        }

        const token =  jwt.sign({id : existingUser._id} , process.env.JWT_SECRET , {expiresIn : '7d'})

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            message : 'user logged in successfully!',
            user : {
                username : existingUser.username,
                email : existingUser.email,
                id : existingUser._id
            }
        })

    } catch (error) {
        return res.status(400).json({
            message : `error logging in user : ${error.message}`
        })
    }
}

const logoutController = async(req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            message : "user logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error logging out user: ${error.message}`
        });
    }
}

module.exports = {registerController , loginController , logoutController}