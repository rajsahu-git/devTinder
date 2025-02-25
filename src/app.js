const express = require('express')

const app = express()

app.use("/",(req,res)=>{
    res.send("heelo from server")
})

app.listen(3000,()=>console.log("server start"))