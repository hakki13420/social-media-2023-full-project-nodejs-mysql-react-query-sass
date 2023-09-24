const { getStories, addStory } = require('../controllers/storie')
const { isAuthenticated } = require('../middlewares/middlewares')

const router= require('express').Router()

router.get('/', isAuthenticated, getStories)
router.post('/', isAuthenticated, addStory)


module.exports=router