const router = require('express').Router()
const {getUser, updateUser, getFriends}=require('../controllers/user')
const { isAuthenticated } = require('../middlewares/middlewares')

router.get('/', getFriends)
router.get('/:id', getUser)
router.put('/:id', isAuthenticated, updateUser)



module.exports=router