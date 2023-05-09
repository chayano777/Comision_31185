import { Router } from "express";
import ProductManagerDao from "../Dao/porductManagerDao";


const router = Router();
const manager = new ProductManagerDao();

router.get('/', async (req, res)=>{
    const products = await manager.getProducts;

    res.send({products});
})

router.get('/:id', async (req, res)=>{
    let pid = req.params.id;

    let product = await manager.getProductById(pid);
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
    const id = req.body.id;

    await manager.deleteProduct(id)

    res.send({
        status: "Success",
        msg: "Producto eliminado"
    });
})

export default router;