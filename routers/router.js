const express = require('express')
const app = express()

app.get('/about', (req, res) => {
    res.status(200).json({name: Alex})
})

module.exports = router