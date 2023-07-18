import ProductDao from '../Dao/managers/productManager.js';
import ProductRepository from '../repository/products.repository.js'
import CartDao from '../Dao/managers/cartManager.js'
import CartRepository from '../repository/cart.repository.js'

export const productServices = new ProductRepository(new ProductDao);
export const cartServices = new CartRepository(new CartDao);
