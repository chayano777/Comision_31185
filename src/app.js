import express from 'express';
import ProductManager from "./managers/productManager.js";

const PORT = '8080';

const manager = new ProductManager();
const app = express();

app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Servidor UP! en Puerto: ${PORT}`);
})

app.get('/products', async (req, res)=>{
    
    const products = await manager.getProducts();

    let limit = req.query.limit;

    if(!limit) return res.send({products});
    let productsLimit = products.slice(0,limit);
    res.send({productsLimit});

});

app.get('/products/:pid', async (req, res)=>{
    
    let pid = req.params.pid;

    let product = await manager.getProductById(pid);

    res.send({product});
})
