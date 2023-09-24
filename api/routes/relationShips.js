const { addRelationShip, getrelationShips, removeRelationShip } = require('../controllers/relationShip')
const { isAuthenticated } = require('../middlewares/middlewares')

const router= require('express').Router()

router.get('/', getrelationShips)
router.post('/', isAuthenticated, addRelationShip)
router.delete('/', isAuthenticated, removeRelationShip)

module.exports=router