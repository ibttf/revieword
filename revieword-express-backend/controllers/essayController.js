const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel')
const Essay=require('../models/essayModel')


//@desc Get all essays
//@route GET /essays
//@access public

const getEssays = asyncHandler(async (req,res)=>{
    const essays=await Essay.find();
    res.status(200).json(essays);
})

//@desc create an essay
//@route POST /essays
//@access private

const createEssay = asyncHandler(async (req,res)=>{

    const {prompt,content}=req.body
    let length=""
    let points=0
    let contentArr=content.split(" ")
    if (contentArr.length>700){
        length="Long"
        points=3
    }else if (contentArr.length > 300 ){
        length="Medium"
        points =2
    }else{
        length="Short"
        points =1
    }
    if ( !prompt || !content){
        res.status(400).json({error: "Prompt or content cannot be blank"})
    }
    const essay=await Essay.create({
        userId:req.user.id,
        content,
        prompt,
        length
    })
    const updatedUser=await User.findByIdAndUpdate(req.user.id, {points: req.user.points-points}, {new: true})
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
//@desc Get a specific essay
//@route GET /essays/:id
//@access private

const getSpecificEssay = asyncHandler(async (req,res)=>{
    const essay=await Essay.findById(req.params.id)
    if (!essay){
        res.status(404).json({error: "Essay not found"})
    }
    res.status(200).json(essay);
})

//@desc Get all reviewable essays to me
//@route GET /essays/reviewable
//@access private

const getReviewableEssays = asyncHandler(async (req,res)=>{
    console.log(req.user.id)
    const essays =await Essay.find({userId: {$ne: req.user.id}, reviewProcess: "false"})
    res.status(200).json(essays);
})


//@desc Get all of my essays that haven't been reviewed yet
//@route GET /essays/my-unreviewed
//@access private

const getMyUnreviewedEssays = asyncHandler(async (req,res)=>{
    const essays = await Essay.find({
        userId: req.user.id,
        reviewProcess: { $in: ['false', 'pending'] },
      });
    
    res.status(200).json(essays);
})

//@desc Get all of my essays that have been reviewed
//@route GET /essays/my-reviewed
//@access private

const getMyReviewedEssays = asyncHandler(async (req,res)=>{
    const essays=await Essay.find({userId: req.user.id, reviewProcess:"true"});
    
    res.status(200).json(essays);
})

//@desc delete a specific essay of mine
//@route DELETE /essays/:id
//@access private

const deleteSpecificEssay = asyncHandler(async (req,res)=>{
    const essay=await Essay.findById(req.params.id);
    if (!essay){
        res.status(404).json({error: "Essay not found"})
    }

    if (essay.user_id.toString()!== req.user.id){
        res.status(403).json({error: "User don't have permission to update other's essays"})
    }


    await essay.deleteOne({_id: req.params.id});
    res.status(200).json(essay)
})


//@desc Get the current essay that i'm working on
//@route GET /essays/current
//@access private

const getCurrentEssay = asyncHandler(async (req,res)=>{
    const essays=await Essay.find({reviewerId: req.user.id, reviewProcess: "pending"});
    res.status(200).json(essays);
})


module.exports={getEssays,createEssay,getSpecificEssay, getReviewableEssays,getMyReviewedEssays,getMyUnreviewedEssays,
    getCurrentEssay, deleteSpecificEssay}