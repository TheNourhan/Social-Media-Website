const express = require('express');
const router = express.Router();
const countries_controller = require('../controllers/countries-controller');
const verfiy_token = require('../middlewares/verfiy-token');
const upload = require('../middlewares/upload-img');

router.route('/:userId/countries')
        .post(verfiy_token, upload.single('countryPhoto'), countries_controller.add_country)
        .get(verfiy_token, countries_controller.get_all_countries)

router.route('/:userId/countries/:countryId')
        .patch(verfiy_token, upload.single('countryPhoto'), countries_controller.edit_country)
        .delete(verfiy_token, countries_controller.delete_country)

module.exports = router;








