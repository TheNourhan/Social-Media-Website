const express = require('express');
const router = express.Router();
const search = require('../controllers/search-countroller');
const verfiy_token = require('../middlewares/verfiy-token');

router.route('/')
        .post(verfiy_token, search.search_all)

module.exports = router;