const express = require('express')
const router = express.Router()

const test = router.get('/testForDeploy', (req, res) => {
    return res.json({})
})

module.exports = test