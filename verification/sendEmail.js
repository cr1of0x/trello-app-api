const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user: 'trellocloneapp@gmail.com',
        pass: 'trelloclone775q'
    }
}, {from : "Verification Service <trellocloneapp@gmail.com>"})

module.exports = transporter