require("dotenv").config()
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Admin=mongoose.Schema({
    
    username:{
        type:String,
        required:[true,"Username must be provided"]
    },
    password:{
        type:String,
        required:[true,"Password must be provided"]
    }
})

Admin.pre("save",async function(next)
{
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

Admin.methods.compareAdminPassword=async function(adminPassword)
{
    const isSame= await bcrypt.compare(adminPassword,this.password)
    return isSame
}
Admin.methods.getToken=function()
{
    const token=jwt.sign({user_id:this._id,username:this.username},process.env.JWT_SECRET_ADMIN,{expiresIn:process.env.JWT_EXPIRY})
    return token
}

module.exports=mongoose.model("admin",Admin)