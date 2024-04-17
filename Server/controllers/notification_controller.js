const Notification = require('../models/notification-model');
const Post = require('../models/post-model');

const get_notifications = (async (req ,res ,next) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ recipient: userId })
            .populate({
                path: 'sender',
                select: '-password -email -followers -following -token -createdAt -updatedAt -__v',
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ status: 'SUCCESS', notifications });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    get_notifications
}
