const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    recipient: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'follow'],
        required: true
    },
    postTitle: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
