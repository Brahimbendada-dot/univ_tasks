const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    const token  = req.rawHeaders.filter(item=>item.startsWith('Bearer'))[0].split(" ")[1]
    if(token){
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
    else{
         return res.status(400).json({
                status:"fail",
                message:'you are not authorized'
            })
    }
    
}


module.exports ={
    verifyToken,
}
