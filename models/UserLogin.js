require("dotenv").config()
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const UserLogin=mongoose.Schema({
    name:{
        type:String,
        required:false,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email needed"],
        
    },
    password:{
        type:String,
        required:[true,"password required"],
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:[true,"Number Required"],
        trim:true
    },
    address:{
        type:String,
        required:false,
        trim:true
    },date:{
        type:Date,
        required:[true,"Date added"]
    }
})
UserLogin.pre("save",async function(next)
{
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
UserLogin.methods.compareUserPassword=async function(userPassword)
{
    const isSame= await bcrypt.compare(userPassword,this.password)
    return isSame
}

UserLogin.methods.getToken=function()
{
    const token=jwt.sign({userid:this._id,userEmail:this.email,Username:this.name},process.env.JWT_SECRET_USER,{expiresIn:process.env.JWT_EXPIRY})
    return token
}


module.exports=mongoose.model("userLogin",UserLogin)
