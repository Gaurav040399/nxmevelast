const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./database/db");
const {userRoute} = require("./route/user.route")
const {postRoute} = require("./route/post.route");
const {auth} = require("./middleware/auth")

const app = express();
app.use(express.json())
app.use(cors())


app.use("/users",userRoute)
app.use(auth)
app.use("/posts",postRoute)



app.listen(process.env.PORT,async()=>{

    try {
        await connection
        console.log("Connected to DB")        
    } catch (error) {
        console.log("connot connect to DB")
    }
    console.log("server is running")

})