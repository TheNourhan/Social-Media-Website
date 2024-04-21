const Message = require('../models/message-model');

const send_message = (async (req ,res ,next) => {
    try{
        const new_message = new Message(req.body);
        const saved_message = await new_message.save();
        res.status(200).json(saved_message);
        //res.status(200).json({ status: 'SUCCESS', data: saved_message });
    }catch(error){
      res.status(500).json(error);
    }
});

const get_all_messages = (async (req ,res ,next) => {
    try{
        const { conversationId } = req.params;
        const messages = await Message.find({
          conversationId: conversationId,
        });
        res.status(200).json(messages);
        //res.status(200).json({ status: 'SUCCESS', data: messages });
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = {
    send_message,
    get_all_messages
}
