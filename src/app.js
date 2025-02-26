const express = require('express')

const app = express()

app.get("/user/:id",
    (req,res,next)=>{
    console.log(req.params)
    res.send(req.params)  
    next()
},
(req,res,next)=>{
    res.send("kuch nhi")
    next()
})
app.post("/user",(req,res)=>{
    res.send("successfully send data")
})

app.put("/user",(req,res)=>{
    res.send("update data")
})

app.patch("/user",(req,res)=>{
    res.send("data has been patch")
})

app.delete("/user",(req,res)=>{
    res.send("user has been delete")
} )
app.listen(3000,()=>console.log("server start"))