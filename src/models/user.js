const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        trim:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!(value.includes("@" && "."))){
                throw new Error("please enter valid email addresss")
            }
        }
        
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    age:{
        type:Number,
        trim:true

    },
    photo:{
        type:String,
        trim:true
    },
    about:{
        type:String,
        default:"this is default value",
        trim:true
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not vali")
            }
        },
        trim:true
    },
    skill:{
        type:[String],
        trim:true
    }


},{
    timestamps:true
},
userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({_id:user._id},"RAJ@sahu",{expiresIn:"1d",})
    return token
}


)
 module.exports = mongoose.model("User",userSchema);
