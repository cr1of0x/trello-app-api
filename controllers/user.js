const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const transporter = require('../verification/sendEmail')
const signupSchema = require('../validators/signupSchema')
const { isUserExists } = require('../services/userServices')
const errorValidation = require('../validators/errorValidation')

const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await isUserExists(email)
        if(!existingUser) return errorValidation(422, 'email', 'User doesnt exists!', res)


        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return errorValidation(422, 'password', 'Invalid password!', res)

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h'})

        res.status(200).json({user: existingUser, token})
    } catch (error) {
        if(error.isJoi) {res.status(422).json({ error })} else{res.status(500).json({ error })}
    }
}

const signup = async (req,res) => {
    
    try {
        const result = await signupSchema.validateAsync(req.body)

        const existingUser = await isUserExists(result.email)

        if(existingUser) return errorValidation(422, 'email', 'User with such email already exists!', res)

        const token = jwt.sign({login : result.login, email: result.email, password: result.password}, 'email_secret', {expiresIn: '1h'})

        const url = `http://localhost:5000/users/verification/${token}`

        await transporter.sendMail({
            to: result.email,
            subject: 'Confirm Email',
            html: `To confirm registration please click <a href="${url}">"here"</a>`
        })

        res.status(200).json({ message : `Email send` })

    } catch(error) {
        if(error.isJoi) {res.status(422).json({ error })} else{res.status(500).json({ error })}
        
    }
}

const verification = async (req,res) => {
    try {
        
        const {login, email, password} = jwt.verify(req.params.token, 'email_secret')

        const hashedPassword = await bcrypt.hash(password, 12)

        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(404).json({errors : {email: 'User with such email already exists'}})

         await User.create({login, email, password: hashedPassword})

        res.send('<h1>Your account sucessfully created! Now you can <a href="http://localhost:3000/login">login</a></h1>')
        } 
    catch(error) {
        res.status(500).json({errors:{token : 'Token is wrong or expired'}})
        }
}

module.exports = {signin, signup, verification}
