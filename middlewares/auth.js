const jwt = require('jsonwebtoken')

const auth = (req , res , next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message: 'Unauthorized'});

        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.User = decoded;
        next();


    }catch(error){
        return res.status(403).json({message: 'Forbidden'})
    }

};

module.exports = {auth};