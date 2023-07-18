import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";


const router = Router();
const productController = new ProductsController();


router.get('/', productController.getProducts)

router.get('/:pid', productController.getProductById)

router.post('/', productController.addProduct)

router.put('/:pid', productController.updateProduct);

router.delete('/:pid', productController.deleteProduct)

export default router;