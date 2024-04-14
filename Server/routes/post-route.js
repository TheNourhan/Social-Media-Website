const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const posts_controller = require('../controllers/posts-controller');
const verfiy_token = require('../middlewares/verfiy-token');

app.use(bodyParser.urlencoded({extended:false}));

router.route('/:userId/countries/:countryId/posts')
        .post(posts_controller.send_post)
        .get(verfiy_token, posts_controller.get_all_posts) // Get country posts for a specific user
        
router.route('/:userId/countries/:countryId/posts/:postId')
        .get(posts_controller.get_post)
        .delete(posts_controller.delete_post)

module.exports = router;








