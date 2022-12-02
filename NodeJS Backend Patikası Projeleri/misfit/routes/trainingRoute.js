const express = require('express')
const trainingController = require('../controllers/trainingController')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = express.Router()

router.route('/').post(roleMiddleware(["Trainer", "admin"]), trainingController.createTraining);
router.route('/').get(trainingController.getAllTrainings);
router.route('/:slug').get(trainingController.getTraining);
router.route('/enrollTraining').post(trainingController.enrollTraining);
router.route('/release').post(trainingController.releaseTraining);
router.route('/:slug').delete(trainingController.deleteTraining);
router.route('/:slug').put(trainingController.updateTraining);



module.exports = router;