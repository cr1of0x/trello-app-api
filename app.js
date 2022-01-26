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

const serverStart = async () => {
    await app.listen(process.env.PORT || 5000, () => {
        console.log('Server is listening on port 5000...')
    })

    return true
}

serverStart()