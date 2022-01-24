const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('<a href="/about">About</a>')
})

app.get('/about', (req, res) => {
    res.status(200).send('<a href="/">Main</a>')
})


app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on 5000 port...');
})