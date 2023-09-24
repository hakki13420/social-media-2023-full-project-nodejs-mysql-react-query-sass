const { getCommentsOfPost, addCommentOfPost } = require('../controllers/comment')
const { isAuthenticated } = require('../middlewares/middlewares')

const router=require('express').Router()

router.get('/', getCommentsOfPost)
router.post('/', isAuthenticated, addCommentOfPost)

module.exports=router