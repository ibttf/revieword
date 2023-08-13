const express=require('express');
const validateToken=require('../middleware/validateTokenHandler')
const {getEssays,createEssay,getSpecificEssay, getReviewableEssays,getMyReviewedEssays,getMyUnreviewedEssays,
getCurrentEssay, deleteSpecificEssay}=require('../controllers/essayController')
const router=express.Router();

//every route that has validate token middleware is a private route
router.get('/', getEssays)

router.post('/', validateToken, createEssay)
router.get('/reviewable', validateToken,getReviewableEssays)
router.get('/my-reviewed',validateToken,getMyReviewedEssays)
router.get('/my-unreviewed',validateToken,getMyUnreviewedEssays)
router.get('/current', validateToken,getCurrentEssay)
router.get('/:id', validateToken, getSpecificEssay)
router.delete('/:id',validateToken, deleteSpecificEssay)



module.exports=router;