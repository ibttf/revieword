const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

//middleware to check your access token
const validateToken=asyncHandler(async(req,res,next)=>{

    //set token variable as whatever's in the bearer sectiono of authorization header from frontend
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization
    token=authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
        if (err){
            //if an error comes from the verification
            res.status(401).json({error: "Token expired"})
        }
        //If there is no error,
        //set the request user to be the user returned from the decodd object
        //which is just the payload we initially set in the jwt, or just the user
        req.user=decoded.user;
        next();
    })
    if (!token){
        //this means that you didn't send an auth token in the bearer section of auth in header
        res.status(401).json({error: "User is not authorized or token is missing in request"})
    }

})

module.exports=validateToken