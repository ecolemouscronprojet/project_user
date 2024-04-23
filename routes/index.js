const express = require('express')
const router = express.Router()


// CONTROLLER
router.use('/user', require('../controllers/user'))
router.use('/formation', require('../controllers/formation'))



module.exports = router