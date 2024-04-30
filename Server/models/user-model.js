const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: 'default/avatar.jpg'
    },
    header:{
        type: String,
        default: 'default/header.jpg'
    },
    followers:[{
        type: ObjectId,
        ref:"User",
    }],
    following:[{
        type: ObjectId,
        ref:"User",
    }],
    bio: {
        type: String,
        maxlength: 150,
    },
    token: {
        type: String,
    },
    verificationCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }

},{ timestamps:true});

var User = mongoose.model('User',UserSchema);
module.exports = User;