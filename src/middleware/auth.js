const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth =async(req,res,next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            throw new Error("token is not valid")
        }
        const decoded = await jwt.verify(token,"RAJ@sahu")
        const {_id} =  decoded
        if(!_id){
            throw new Error("user is not found")
        }
        req._id=_id
        next()
    } catch (error) {
        res.status(400).send("error:"+error.message)
    }

}

module.exports = userAuth;
