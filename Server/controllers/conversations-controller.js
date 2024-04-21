const Conversation = require('../models/conversation-model');

const new_conversation = (async (req ,res ,next) => {
    try{
        const { senderId, receiverId } = req.body;

        const existingConversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (existingConversation) {
            return res.status(200);
        }
        const new_conversation = new Conversation({
            members: [senderId, receiverId],
        });
        const saved_conversation = await new_conversation.save();
        res.status(200).json(saved_conversation);
        //res.status(200).json({ status: 'SUCCESS', data: saved_conversation });
    }catch(error){
        res.status(500).json(error);
    }
});

const gat_all_conversations = (async (req ,res ,next) => {
    try{
        const { userId } =  req.params;
        const conversations = await Conversation.find({
          members: { $in: [userId] },
        });
        res.status(200).json(conversations);
        //res.status(200).json({ status: 'SUCCESS', data: conversations });
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = {
    new_conversation,
    gat_all_conversations,
}
