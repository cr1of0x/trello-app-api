const express = require('express')
const app = express()
const mongoose = require('mongoose')
const users = require('./routers/routeUsers')
require('dotenv').config()

app.use(users)

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected')).catch(err => console.log(err))

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000...')
})