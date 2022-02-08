const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    login: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    type: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema)