const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('home/index')
});

router.get('/2', (req, res) => {
    res.render('home/index2')
});

// CONTROLLER
router.use('/user', require('../controllers/user'))
router.use('/auth', require('../controllers/auth'))



module.exports = router