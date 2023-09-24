const { getPosts, addPost, removePost } = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/middlewares');

const router= require('express').Router()

router.get('/', isAuthenticated, getPosts);
router.post('/', isAuthenticated, addPost);
router.delete('/:id', isAuthenticated, removePost);


module.exports=router