import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const manager = new ProductManager();

const router = Router();



router.get('/', async (req, res)=>{
    
    const products = await manager.getProducts();

    res.render('home', {products});
})

router.get('/realTimeProducts',(req, res)=>{
    res.render('realTimeProducts',{})
})





export default router;