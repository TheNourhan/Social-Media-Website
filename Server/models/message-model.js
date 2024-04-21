const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
},{ timestamps: true });

var Message = mongoose.model('Message',MessageSchema);
module.exports = Message;