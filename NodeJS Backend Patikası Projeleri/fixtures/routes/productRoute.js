const express = require('express')
const productController = require('../controllers/productController')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = express.Router()

router.route('/').post(roleMiddleware(["admin"]),productController.createProduct);
router.route('/').get(productController.getAllProducts);
router.route('/:slug').get(productController.getProduct);
router.route('/addToCart').post(productController.getAddToCart);
router.route('/remove').post(productController.removeProduct);
router.route('/:slug').delete(productController.deleteProduct);
router.route('/:slug').put(productController.updateProduct);

module.exports = router;