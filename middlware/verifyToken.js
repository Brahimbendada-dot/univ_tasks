const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    const token = req.rawHeaders[1].split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY,(error,user)=>{
        if(error){
            return res.status(400).json({
                status:"fail",
                message:'you are not authorized'
            })
        }
        req.user = user
        next();
    })
}


module.exports ={
    verifyToken,
}