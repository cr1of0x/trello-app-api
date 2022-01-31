const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const transporter = require('../verification/sendEmail')

const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h'})

        res.status(200).json({result : existingUser, token})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"})
    }
}

// const signup = async (req,res) => {
//     const {login, email, password, confirmPassword} = req.body
    
//     try {
//         const existingUser = await User.findOne({ email })

//         if(existingUser) return res.status(404).json({message :'User already exists'})

//         if(password !== confirmPassword) return res.status(400).json({message :"Passwords don't match"})

//         const hashedPassword = await bcrypt.hash(password, 12)

//         const result = await User.create({login: `${login}`, email, password: hashedPassword})

//         const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})

//         res.status(200).json({result, token})

//     } catch(error) {
//         res.status(500).json({ message: "Something went wrong" })
//     }
// }

const signup = async (req,res) => {
    const {login, email, password, confirmPassword} = req.body
    
    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(404).json({message :'User already exists'})

        if(password !== confirmPassword) return res.status(400).json({message :"Passwords don't match"})

        const token = jwt.sign({login, email, password}, 'email_secret', {expiresIn: '1h'})

        const url = `http://localhost:5000/users/verification/${token}`

        await transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `To confirm registration please click <a href="${url}">"here"</a>`
        })

        res.status(200).json({ message : `Email send` })

    } catch(error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const verification = async (req,res) => {
    try {
        const {login, email, password} = jwt.verify(req.params.token, 'email_secret')

        const hashedPassword = await bcrypt.hash(password, 12)

         await User.create({login, email, password: hashedPassword})

        res.send('Your account sucessfully created! Now you can <a href="http://localhost:3000/login">login</a>')
        } 
    catch(error) {
        res.send(error)
        }
}

module.exports = {signin, signup, verification}
