import { Router } from "express";
import ProductManagerDao from "../Dao/productManagerDao.js";
//import ProductManager from "../managers/productManager.js";
import productModel from "../Dao/models/product.model.js";

const router = Router();
const manager = new ProductManagerDao();


router.get('/', async (req, res)=>{
                          

    const products = await manager.getProducts('', 3 , 1, -1)

    res.render('home', products );
})

router.get('/realTimeProducts', (req, res)=>{

    res.render('realTimeProducts',{})
})

router.get('/chat', (req, res)=>{
    res.render('chat', {});
})

router.get('/products', async (req, res)=>{

    const page = req.query.page || 1;

    const {products, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages} = await manager.getProducts('', 3, page, 'desc')
     
    res.render('products',
       { 
        products,
        prevPage,
        nextPage,
        totalPages,
        hasPrevPage, 
        hasNextPage
       });
})





export default router;