const express = require('express');
const router = express.Router();
const messages_controller = require('../controllers/messages-controller');
const verfiy_token = require('../middlewares/verfiy-token');

router.route('/')
    .post(verfiy_token, messages_controller.send_message)

router.route('/:conversationId')
    .get(verfiy_token, messages_controller.get_all_messages)

module.exports = router;