const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Build working well')
})


app.listen(5000, () => {
    console.log('Server listening on 5000 port...');
})