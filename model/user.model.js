const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name : String,
    email : {require:true,type:String,unique:true},
    gender : String,
    password : String,
    age : {require:true,type:Number},
    city: String,
    is_married : Boolean
},{
    versionKey:false
})


const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}