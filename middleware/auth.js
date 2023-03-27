const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token,process.env.jwt_token);
        if(decoded){
            req.body.userID = decoded.userID
            next()
        }else{
            res.status(400).json({"msg":"Please login !"})
        }
    }else{
        res.status(400).json({"msg":"Please login !"})

    }
}

module.exports = {
    auth
}