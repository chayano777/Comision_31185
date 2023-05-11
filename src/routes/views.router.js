import { Router } from "express";
import ProductManagerDao from "../Dao/productManagerDao.js";
//import ProductManager from "../managers/productManager.js";


const router = Router();
const manager = new ProductManagerDao();


router.get('/', async (req, res)=>{
    
    const products = await manager.getProducts()

    res.render('home', {
        products
    });
})

router.get('/realTimeProducts', (req, res)=>{

    res.render('realTimeProducts',{})
})

router.get('/chat', (req, res)=>{
    res.render('chat', {});
})





export default router;