const express = require('express')
const router = express.Router()

const users = router.get('/api/users', (req, res) => {
    res.send('Json here')
})

module.exports = users