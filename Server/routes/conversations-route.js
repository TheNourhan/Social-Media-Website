const express = require('express');
const router = express.Router();
const conversation_controller = require('../controllers/conversations-controller');
const verfiy_token = require('../middlewares/verfiy-token');

router.route('/')
    .post(verfiy_token, conversation_controller.new_conversation)

router.route('/:userId')
    .get(verfiy_token, conversation_controller.gat_all_conversations)

module.exports = router;