const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel')
const Essay=require('../models/essayModel')

//@desc Signup a user
//@route POST /api/users/signup
//@access public
const signupUser=asyncHandler(async(req,res)=>{
    const {username,password, passwordConfirmation}=req.body

    //if they left any field blank
    if (!username || !password || !passwordConfirmation){
        //throw an error
        res.status(400).json({error: "All fields are mandatory"})
    }
    //if the password confirmation isn't right
    else if (password!==passwordConfirmation){
        res.status(400).json({error: "Password confirmation does not match"})
    }
    //search for users in database
    const userAvailable=await User.findOne({username});
    if (userAvailable){
        //if the username is already registered, send that the user is already registered
        res.status(400).json({error: "User is already registered"})
    }

    //OTHERWISE, IF EVERYTHIGN IS GOOD
    //hash password so we don't save something secret to our database
    const hashedPassword=await bcrypt.hash(password,10)
    
    const user=await User.create({
        username,
        password: hashedPassword
    })
    await user.save();
    if (user){
        //if the user was actually created and saved, 
        //create an authentication token (serves as login)
        const accessToken=jwt.sign(
            {
                user:{
                    username: user.username,
                    reviewingEssayId: user.reviewingEssayId,
                    id: user.id,
                    points: user.points
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '24h'}
        )
        const refreshToken=jwt.sign(
            {
                user:{
                    username: user.username,
                    reviewingEssayId: user.reviewingEssayId,
                    id: user.id,
                    points: user.points
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '30d'}
        )
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
        res.status(200).json({accessToken})
    }else{
        res.status(400).json({error: "User data is not valid"})
    }   
}
)

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {username, password}=req.body;
    if (!username || ! password){
        //if any field is blank, throw an error
        res.status(400).json({error: "All fields are mandatory"})
    }
    const user=await User.findOne({username});
    if (user && await(bcrypt.compare(password, user.password))){
        //if the user with existing username exists and their stored hashed password
        //is the same as the password they tried to login with
        //create an access token
        const accessToken=jwt.sign({
            user:{
                username: user.username,
                reviewingEssayId: user.reviewingEssayId,
                id:user.id,
                points: user.points
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "24h"
        }
        );
        //create a refreshToken
        const refreshToken=jwt.sign(
            {
                user:{
                    username: user.username,
                    reviewingEssayId: user.reviewingEssayId,
                    id: user.id,
                    points: user.points
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '30d'}
        )
        //send the access token to the client
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); 
        res.status(200).json({accessToken})
    }else {
        //password doesn't match or username doesn't return a user
        res.status(401).json({error: "Username or password not valid"})
    }

})
//@desc decrypts auth token
//@route get /api/users/current
//@access public
const current=asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})

const logoutUser=asyncHandler(async(req,res)=>{
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
})

//@desc begin reviewing a new essay
//@route POST /essays/:id
//@access protected

const startEssayReview = asyncHandler(async(req,res)=>{
    const updatedEssay=await Essay.findByIdAndUpdate(req.params.essayId, {reviewerId: req.user.id, reviewProcess: "pending"}, {new: true})
    const updatedUser=await User.findByIdAndUpdate(req.user.id,{reviewingEssayId: req.params.essayId}, {new: true})
    const accessToken=jwt.sign(
        {
            user:{
                username: updatedUser.username,
                reviewingEssayId: updatedUser.reviewingEssayId,
                id: updatedUser.id,
                points: updatedUser.points
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '24h'}
    )
    const refreshToken=jwt.sign(
        {
            user:{
                username: updatedUser.username,
                reviewingEssayId: updatedUser.reviewingEssayId,
                id: updatedUser.id,
                points: updatedUser.points
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '30d'}
    )
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
    res.status(200).json({accessToken})
})


//@desc finish reviewing a new essay
//@route PATCH /essays/:id
//@access protected
const finishEssayReview=asyncHandler(async(req,res)=>{
    const {comments, flowComments, toneComments}=req.body
    if (!comments || !flowComments || !toneComments){
        res.status(400).json({error: "Comments can't be empty"})
    }
    const updatedEssay=await Essay.findByIdAndUpdate(req.params.essayId, {comments: req.body.comments,flowComments: req.body.flowComments,toneComments: req.body.toneComments, reviewProcess: "true"}, {new: true})

    let pointValue=0;
    if (updatedEssay.length==="Long"){
        pointValue=3
    }else if (updatedEssay.length==="Medium"){
        pointValue=2
    }else{
        pointValue=1
    }

    const updatedUser=await User.findByIdAndUpdate(req.user.id,{reviewingEssayId: "", points: req.user.points + pointValue}, {new: true})
    const accessToken=jwt.sign(
        {
            user:{
                username: updatedUser.username,
                reviewingEssayId: updatedUser.reviewingEssayId,
                id: updatedUser.id,
                points: updatedUser.points
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '24h'}
    )
    const refreshToken=jwt.sign(
        {
            user:{
                username: updatedUser.username,
                reviewingEssayId: updatedUser.reviewingEssayId,
                id: updatedUser.id,
                points: updatedUser.points
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '30d'}
    )
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
    res.status(200).json({accessToken})
})



module.exports={signupUser,loginUser,current,logoutUser, startEssayReview, finishEssayReview}
