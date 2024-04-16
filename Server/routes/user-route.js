const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require("body-parser");
const users_controller = require('../controllers/users-controller');
const verfiy_token = require('../middlewares/verfiy-token');

app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

router.route('/register')
        .post(users_controller.register)
        
router.route('/login')
        .post(users_controller.login)

router.route('/refresh_token')
        .post(users_controller.refresh_token)

router.route('/logout')
        .get(users_controller.logout);
 
router.route('/api/users/:userId')
        .get(verfiy_token, users_controller.get_profile)
        .put(verfiy_token, users_controller.edit_profile)
        .delete(verfiy_token, users_controller.delete_profile)
        
router.route('/api/users/:userId/follow')
        .post(verfiy_token, users_controller.follow)

router.route('/api/users/:userId/unfollow')
        .delete(verfiy_token, users_controller.unfollow)
 
router.route('/api/users/:userId/following')
        .get(verfiy_token, users_controller.get_following)

router.route('/api/users/:userId/followers')
        .get(verfiy_token, users_controller.get_followers)

module.exports = router;








