const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const Joi = require('joi');


router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/save', (req, res) => {
  const user = req.body;
  const errors = validateUser(user);
  if (errors) {
    res.render('auth/register',  {
      errors,
      user
    })
    return;
  }

  userModel.save(user);
  res.render('auth/register', {
    message: 'Inscription OK'
  })
})

function validateUser(user) {
  const schema = Joi.object({
    firstname: Joi.string()
      .required(),
    lastname: Joi.string()
      .required(),
    username: Joi.string()
      .required(),
    password: Joi.string()
      .required()
  });

  const { error } = schema.validate(user, { abortEarly: false })

  return error?.details
}


module.exports = router