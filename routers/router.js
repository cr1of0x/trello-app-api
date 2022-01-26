const express = require('express')
const router = express.Router()

router.get('/about', (req, res) => {
    res.status(200).send('Test')
}

module.exports = router;