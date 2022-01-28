const express = require('express');
const router = express.Router()
const login = require('../controllers/user.js')

router.post('/signup', login.signup)
router.post('/signin', login.signin)

module.exports = router