const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const posts_controller = require('../controllers/posts-controller');
const verfiy_token = require('../middlewares/verfiy-token');
const upload = require('../middlewares/upload-img');

app.use(bodyParser.urlencoded({extended:false}));

router.route('/:userId/posts')
        .post(verfiy_token, upload.single('postPhoto'), posts_controller.send_post)

router.route('/:userId/countries/:countryId/posts')
        .get(verfiy_token, posts_controller.get_all_posts) // Get country posts for a specific user
        
router.route('/:userId/countries/:countryId/posts/:postId')
        .post(verfiy_token, posts_controller.toggle_like)
        .get(posts_controller.get_post)
        .delete(posts_controller.delete_post)

router.route('/:userId/timeline')
        .get(verfiy_token, posts_controller.timeline)

module.exports = router;
