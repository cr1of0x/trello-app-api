const express = require('express');
const router = express.Router()
const login = require('../controllers/user.js')

router.post('/signup', login.signup)
router.post('/signin', login.signin)
router.post('/gmail', login.gmail)
router.post('/gmaillogin', login.gmailLogin)
router.get('/verification/:token', login.verification)
router.get('/gmail/:token', login.gmailVerification)

module.exports = router