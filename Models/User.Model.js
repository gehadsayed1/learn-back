const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail , 'Invalid email format'],
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum: [userRoles.USER, userRoles.ADMIN],
        default: userRoles.USER
    },
    avatar: {
        type: String,
        default: '../uploads/avatar.png'
    }
})

 module.exports = mongoose.model('User',UserSchema )