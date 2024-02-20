const express = require('express')
const router = express.Router()
const userModel = require('../models/users')


router.get('/', (req, res) => {
  const users = userModel.users
  res.render('user/list', {
    users
  })  
})

router.get('/register', (req, res) => {
  res.render('user/register')  
})


router.get('/remove', (req, res) => {
  const id = req.query.id
  if(id) {
    userModel.delete(id)
  }

  res.redirect('/user')  
})


router.post('/save', (req, res) => {
  const user = req.body
  // @TODO ajouter les vérifications
  userModel.save(user)

  res.redirect('/user')
})

module.exports = router