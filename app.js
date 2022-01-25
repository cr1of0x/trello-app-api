const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected')).catch(err => console.log(err))

app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on 5000 port...');
})

app.get('/', (req, res) => {
    
    res.status(200).send('<a href="/about">About</a>')
})

app.get('/about', (req, res) => {
    res.status(200).send('<a href="/">Main</a>')
})