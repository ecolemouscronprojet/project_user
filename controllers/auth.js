const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.get('/connection', (req, res) => {
  res.render('auth/connection')
})

router.post('/save', async (req, res) => {
  const user = req.body;
  const errors = validateUser(user);
  const saltRounds = 10;
  if (errors) {
    res.render('auth/register', {
      errors,
      user
    })
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    userModel.save(user);
    res.render('auth/register', {
      message: 'Inscription OK'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Failed to register');
  }
})


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = userModel.users.find(u => u.username === username);

  if (!user) {
    return res.status(401).send('User not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.userId = user.id;
    res.send('Logged in successfully');
  } else {
    res.status(401).send('Password is incorrect');
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully');
});

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