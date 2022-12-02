const express = require('express');
const pageController = require('../controllers/pageController');
const router = express.Router();

router.route('/about').get(pageController.getAboutPage);
router.route('/add').get(pageController.getAddPage);
router.route('/photo').get(pageController.getPhotoPage);
router.route('/photos/edit/:id').get(pageController.getEditPage);

module.exports = router;
