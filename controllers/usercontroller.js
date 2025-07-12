const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cokkieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const register = async(req , res)=>{
    try{
        const {name , email , password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: 'all field required'});
        }
        const hasedpassword = await bcrypt.hash(password , 10);
        const newuser = new User({name , 
            email , 
            password : hasedpassword
        });
        await newuser.save();
        return res.status(200).json({message: ' user register successfully' , newuser});

    }catch(error){
        console.error('error during register user' , error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const login = async(req,res)=>{
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'email and passwrod both are reuired to login'});
        }
        const existinguser = await User.findOne({email});
        if(!existinguser){
            return res.status(404).json({message: 'user not found'})
        }
        const ispasswordvalid = await bcrypt.compare(password, existinguser.password)
        if(!ispasswordvalid){
            return res.status(500).json({message: 'incorrect password'})
        }
        const token = await jwt.sign(
            {userId : existinguser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn : '1d'}
        );

        res.status(200).cookie("token" , token, {
            httpOnly: true,
            sameSite : "Strict" , 
            maxAge: 24 * 60 * 60 * 1000
        }).json({message: 'welcome back ' , existinguser});

    }catch(error){
        console.error('error during login user' , error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const logout = async(req , res)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({message: "Logout successfully"})

    }catch(error){
        console.error('error during logout' , error);
        res.status(500).json({message : 'internal server error'});
    }
}


module.exports = {register , login , logout}