const express=require('express');
const {signupUser,loginUser,current,logoutUser,startEssayReview, finishEssayReview}=require('../controllers/userController')
const validateToken=require('../middleware/validateTokenHandler')

const router=express.Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/current',validateToken, current)
router.delete('/logout', logoutUser)
router.post('/:essayId', validateToken, startEssayReview)
router.put('/:essayId', validateToken, finishEssayReview)

module.exports=router;