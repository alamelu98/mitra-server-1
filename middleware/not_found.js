const StatusCode=require("http-status")

const notFound=(req,res,next)=>{
    res.status(StatusCode.NOT_FOUND).json({
        message:"Page not found"
    })
}

module.exports=notFound