const express = require("express")

const postRoute = express.Router()
const {PostModel} = require("../model/post.model")

// postRoute.use(express.json())
postRoute.get("/",(req,res)=>{

})
postRoute.get("/",async(req,res)=>{
   try {
    const token =req.headers.authorization
    const decoded = jwt.verify(token,process.env.jwt_token)
    const {device = ["Laptop", "Tablet", "Mobile"],page} = req.query
    const limit = 3
    const skip = (page-1)*limit
    if(decoded){
        const posts = await PostModel.find({$and:[{userID:decoded.userID},{device:{$in:device}}]}).skip(skip).limit(limit)
        res.status(200).json({"msg":"post","post":posts})
    }
   } catch (err) {
    res.status(400).json({"msg":err.message})
   }
})
postRoute.post("/add",async(req,res)=>{
    try {
        const newpost = new PostModel(req.body);
        await newpost.save()
        res.status(200).json({"msg":"Post has been created","post":newpost})
    } catch (err) {
        res.status(400).json({"msg":err.message})
    }

})
postRoute.patch("/update/:id",async(req,res)=>{
    try {
        const id= req.params.id
        const newdata = await PostModel.findByIdAndUpdate(id,(req.body))
        res.status(200).send({"msg":"Data Has been Updated"})
    } catch (err) {
        res.status(400).send({msg:err.message,"error":"post route post method"})

    }
})
postRoute.delete("/delete/:id",async(req,res)=>{
    const {id} =req.params;
    await PostModel.findByIdAndDelete({_id:id});
    res.status(200).send({"msg":"Note has been Deleted"});  
})


module.exports = {
    postRoute
}