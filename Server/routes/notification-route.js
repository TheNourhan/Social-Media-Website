const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const notification_controller = require('../controllers/notification_controller');
const verfiy_token = require('../middlewares/verfiy-token');

app.use(bodyParser.urlencoded({extended:false}));

router.route('/:userId/notifications')
        .get(verfiy_token, notification_controller.get_notifications)
        
module.exports = router;
