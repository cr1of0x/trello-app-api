import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    login: String,
    id: Number
})

const User =  mongoose.model('User', userSchema)