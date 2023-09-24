const { sharePost, getSharePost } = require('../controllers/share')
const { isAuthenticated } = require('../middlewares/middlewares')

const router=require('express').Router()

router.get('/', isAuthenticated, getSharePost)
router.post('/', isAuthenticated, sharePost)

module.exports= router