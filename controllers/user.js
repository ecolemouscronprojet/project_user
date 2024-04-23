const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const addressModel = require('../models/addresses')


router.get('/', (req, res) => {
  const users = userModel.users
  res.render('user/list', {
    users
  })  
})

router.get('/register', (req, res) => {
  res.render('user/register')  
})

router.get('/update', (req, res) => {
  const { id } = req.query;
  if(id == null) {
    return res.redirect('/user')
  }
  const user = userModel.users.find(u => u.id === id)
  
  if(!user) {
    return res.redirect('/user')
  }  
  
  res.render('user/register', {
    user
  })
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


router.get('/address/:userId', (req, res) => {
  const { userId } = req.params;
  const addresses = addressModel.addresses.filter((address) => {
    return address.userId == userId
  })
  console.log('addresses', addresses)
    res.render('user/address-list', {
      userId,
      addresses
    })  
})


router.get('/address/:userId/add', (req, res) => {
  const { userId } = req.params;

  res.render('user/address-form', {
      userId
    })  
})

router.post('/address/:userId/save', (req, res) => {
  const { userId } = req.params;
  const address = req.body
  console.log('address', address)
  // @TODO ajouter les vérifications
  addressModel.save(address)

  
  res.redirect(`/user/address/${userId}`)
})

router.get('/address/:userId/remove', (req, res) => {
  const { userId } = req.params;
  const { id } = req.query
  if(id) {
    addressModel.delete(id)
  }

  res.redirect(`/user/address/${userId}`)
})

module.exports = router