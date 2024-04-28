const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require("body-parser");
const users_controller = require('../controllers/users-controller');
const verfiy_token = require('../middlewares/verfiy-token');
const upload = require('../middlewares/upload-img');

app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

router.route('/register')
        .post(users_controller.register)
        
router.route('/login')
        .post(users_controller.login)

router.route('/refresh_token')
        .post(users_controller.refresh_token)

router.route('/verify')
        .post(users_controller.verify_code)

router.route('/logout')
        .post(users_controller.logout);

router.route('/api/users')
        .get(verfiy_token, users_controller.get_all_users)
 
router.route('/api/users/:userId')
        .get(verfiy_token, users_controller.get_profile)
        .delete(verfiy_token, users_controller.delete_profile)

router.route('/api/users/:userId/edit')
        .get(verfiy_token, users_controller.get_edit_profile_info)
        .put(verfiy_token, upload.fields([{ name: 'avatar' }, { name: 'header' }]), users_controller.edit_profile)
        
router.route('/api/users/:userId/follow')
        .post(verfiy_token, users_controller.follow)

router.route('/api/users/:userId/unfollow')
        .delete(verfiy_token, users_controller.unfollow)
 
router.route('/api/users/:userId/following')
        .get(verfiy_token, users_controller.get_following)

router.route('/api/users/:userId/followers')
        .get(verfiy_token, users_controller.get_followers)

module.exports = router;








