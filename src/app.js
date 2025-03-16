const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const User = require("./models/user")
const connectionDb = require("./config/database")
const {validateSignUpDat9a} =require("./utils/validation")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userAuth = require("../src/middleware/auth")


app.use(express.json())

app.use(cookieParser());

app.post("/signup",async (req,res)=>{
    const {firstName,lastName,emailId,password} = req.body
    console.log(User)
    try{ 
        validateSignUpDat9a(req,res)
        const hashPassword = await bcrypt.hash(password,10)
        const user = new User({firstName,lastName,emailId,password:hashPassword})
        await user.save()
        res.status(201).json({ message: 'User created successfully' });
        console.log(hashPassword);
    }
    catch (err){
        res.send(err)
        console.log("somthing went wrong in signup api",err)
    }

})

app.post("/login",async(req,res)=>{
        const {emailId,password} = req.body
        const user = await User.findOne({emailId:emailId})
        if(!user){
            return res.send("email id not currect")
        }
        bcrypt.compare(password, user.password, async (err, result)=> {
            if (err) {
                return res.status(500).send("Error verifying password");
            }
            if (result) { 
                const token = await jwt.sign({_id:user._id},"RAJ@sahu")
                console.log("token", token,user._id)           
                res.cookie("token",token)

                return res.status(200).json({message:"User is correct"});
            } else {
                return res.status(400).send("Incorrect password");
            }
        });

    })

    //Feed API - GET /feed
app.get("/getUser",userAuth,async(req,res)=>{
    
    try{
        // const {token}= req.cookies
        // if(!token){
        //     res.send("use is not loged in")
        // }
        // const decoded = jwt.verify(token,"RAJ@sahu")
        // let {_id}=decoded
        // if(!_id){
        //     res.status(404).send("user is not loged in")
        // }
        const _id = req._id
        if(!_id){
            throw new Error("user is not found")
        }      
        const user = await User.findOne({_id:_id})
        res.send(user)
    }
    catch(err){
        res.status(400).send("somthing went wrong")
    }
})

app.get("/getAllUser",async(req,res)=>{
    try{ 
        const user = await User.find()
        res.send(user)
    }
    catch(err){
        res.send(400).send("somthing went wrong")
    }
})

app.delete("/deleteUser",async(req,res)=>{
    const {token}= req.cookies
    const decoded = jwt.verify(token,"RAJ@sahu")
    let {_id}=decoded
    try{
        const user = await User.findOneAndDelete({_id:_id})
        res.send("user deleted")
    }
    catch(err){
        res.send(400).send("somthing went wron")
    }
})

app.put("/updateUser",async(req,res)=>{
    const {token}= req.cookies
    try{
        const decoded = jwt.verify(token,"RAJ@sahu")
        let {_id}=decoded
        const userDetailed = await User.findByIdAndUpdate(_id,req.body)
        userDetailed.save()
        res.send(userDetailed)
    }
    catch(err){
        res.send("somthing went wrong")
    }
})

app.patch("/updateUserFild",async(req,res)=>{
    const {token}= req.cookies
    try{
        const decoded = jwt.verify(token,"RAJ@sahu")
        let {_id}=decoded
        const data = req.body
        console.log(data)
        const userId = await User.findByIdAndUpdate(_id,data,{
            returnDocument:'after',
            runValidators:true
        })
        res.send(`name has been sucessfully updated ${userId}`)
    }
    catch(err){
        res.send("somthing went wrong "+err)
    }
})

connectionDb().then(()=>{
    console.log("connnection established")
    app.listen(777,()=>console.log("server start"))
})

.catch((err)=>{
    console.log("Database cannot be coonect")
})