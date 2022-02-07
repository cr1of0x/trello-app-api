const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

const isUserExists = (email) => {
    return User.findOne({ email });
}

const isPasswordCorrect = (password, passwordToCompare) => {
    return bcrypt.compare(password, passwordToCompare)
}

module.exports = {isUserExists, isPasswordCorrect}