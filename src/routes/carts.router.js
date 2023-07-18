import { Router } from "express";
import CartsController from '../controllers/carts.controller.js'
//import CartManagerDao from "../Dao/cartManagerDao.js";
//import CartManager from "../Dao/managers/cartManager.js";


const router = Router();

const cartController = new CartsController();

router.get('/', cartController.getCartProd)

router.get('/:id', cartController.getCartProdById);

router.post('/', cartController.createCart);

router.post('/:cid/products/:pid', cartController.addProductToCart)

router.put('/:cid', cartController.updateProduct)

router.put('/:cid/products/:pid', cartController.updateCartQty)

router.delete('/:cid', cartController.deleteAllProductOnCart)

router.delete('/:cid/product/:pid', cartController.deleteProductInCart)



export default router;