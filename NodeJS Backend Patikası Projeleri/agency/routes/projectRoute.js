const express = require('express');
const projectController = require('../controllers/projectController')
const router = express.Router();

router.route('/').get(projectController.getAllProjects);
router.route('/projects/:id').get(projectController.getProject);
router.route('/projects').post(projectController.createProject);
router.route('/projects/:id').put(projectController.updateProject);
router.route('/projects/:id').delete(projectController.deleteProject);


module.exports = router;