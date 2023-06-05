import { Router } from "express";
import ProductManagerDao from "../Dao/productManagerDao.js";


const router = Router();
const manager = new ProductManagerDao();


router.get('/', async (req, res)=>{
    const query = req.query.query;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort;

    const products = await manager.getProducts(query, limit, sort, page);

    res.send({
        status: 'Success',
        payload: products
    })
})

/*
router.get('/', async (req, res)=>{
    const products = await manager.getProducts();

    res.send({products});
})*/

router.get('/:pid', async (req, res)=>{
    let id = req.params.pid;

    let product = await manager.getProductById(id);
        res.send({product}); 
})

router.post('/', async (req, res)=>{

    const reqProduct = req.body;
    const product = await manager.addProduct(reqProduct);
    res.send({
        status: Success,
        product
    });
})

router.put('/:pid', async (req, res)=>{
    
    const reqProduct = req.body;
    
    const id = req.params.pid;

   const updateProduct = await manager.updateProduct(id, reqProduct);

   return res.send({
        updateProduct
   });
});

router.delete('/:pid', async (req, res)=>{
    
    const id = req.params.pid;

    console.log(id)

    await manager.deleteProduct(id)

    res.send({
        status: "Success",
        msg: "Producto eliminado"
    });
})

export default router;