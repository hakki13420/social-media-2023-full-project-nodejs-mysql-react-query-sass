const { getLikes, addLike, removeLike } = require('../controllers/like')
const { isAuthenticated } = require('../middlewares/middlewares')

const router= require('express').Router()

router.get('/',getLikes)
router.post('/', isAuthenticated,addLike)
router.delete('/', isAuthenticated, removeLike)


module.exports=router