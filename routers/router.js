const express = require('express')
const router = express.Router()

const about = router.get('/about', (req, res) => {
    res.status(200).send('Test')
}

module.exports = about