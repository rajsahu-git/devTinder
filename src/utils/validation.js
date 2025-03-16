const validateSignUpDat9a = (req,res)=>{
    console.log(req.body)
    const {firstName,lastName,emailId,password} = req.body
    if(!firstName || !lastName ){
        res.send("Name is not valid")
        
    }
    else if (password.lenght>6){
        res.send("password is not valid")
        
    }
    else if(!emailId.endsWith(".com")){
        res.send("email is not valid")
        
    }
    return
}

module.exports = {validateSignUpDat9a}