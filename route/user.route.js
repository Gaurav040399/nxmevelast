const express = require("express")
const userRoute = express.Router()
const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// userRoute.use(express.json())

userRoute.post("/register",async(req,res)=>{
    const {name,email,password,gender,city,age,is_married} = req.body
        try {
            const user = await UserModel.findOne({email})
            // console.log(user);
            if(user){
                res.status(400).send({"msg":"Please login, user already exist"});
            }else{
                bcrypt.hash(password, 4, async(err, hash) => {
                    const newuser = new UserModel({name,email,password:hash,gender,city,age,is_married});
                    await newuser.save();
                    res.status(200).send({"msg":"Registration Has been seccessfull","user":newuser});
                });
            }
        } catch (err) {
            res.status(400).send({"msg":err.message})
        }
    })

userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
     try {
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(400).json({"msg":"Please sign Up First"})
        }else{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).json({"msg":"Log in Seccessfull","token":jwt.sign({userID:user._id},process.env.jwt_token)})
                }else{
                    res.status(400).json({"msg":"Invalid Credential"})
                }
            })
        }
     } catch (error) {
        
     }
})

module.exports = {
    userRoute
}