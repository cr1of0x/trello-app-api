const express = require('express');
const router = express.Router()
const login = require('../controllers/user.js')
const jwt = require('jsonwebtoken')

router.post('/signup', login.signup)
router.post('/signin', login.signin)
router.get('/verification/:token', login.verification)

module.exports = router