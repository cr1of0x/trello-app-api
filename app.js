const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routers/router')
const test = require('./test')
require('dotenv').config()

app.use(router)
app.use(test)

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected')).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.status(200).send('Works')
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on 5000 port...');
})