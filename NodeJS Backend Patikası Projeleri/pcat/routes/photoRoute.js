const express = require('express');
const photoController = require('../controllers/photoController');
const router = express.Router();

router.route('/').get(photoController.getAllPhotos);
router.route('/photos/:id').get(photoController.getPhoto);
router.route('/photos').post(photoController.createPhoto);
router.route('/photos/:id').put(photoController.updatePhoto);
router.route('/photos/:id').delete(photoController.deletePhoto);

module.exports = router;
