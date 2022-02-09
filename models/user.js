const mongoose = require('mongoose')
const EMAIL = 'email'
const GOOGLE = 'google'

const userSchema = mongoose.Schema({
    login: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    type: {type: String,  enum: {
        values: [EMAIL, GOOGLE],
        message: '{VALUE} is not supported'
      },required: true}
})

module.exports = mongoose.model('User', userSchema)