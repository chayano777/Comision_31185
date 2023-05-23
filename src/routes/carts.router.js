import { Router } from "express";
import CartManagerDao from "../Dao/cartManagerDao.js";
//import CartManager from "../Dao/managers/cartManager.js";


const router = Router();

const manager = new CartManagerDao();

router.get('/', async (req, res)=>{
    const carts = await manager.getCartProd();

    res.send({carts});
})

router.get('/:id', async (req, res)=>{
    const cid = req.params.id;

    const cart = await manager.getCartProdById(cid);


    if(!cart){
        return res.send({
            status: 'Error',
            msg: `Carrito con ID: ${cid}, inexistente. `
        })
    }

    res.send({cart})

})

router.post('/', async (req, res)=>{
    const cart = await manager.createCart();

    res.send({
        status: 'Success',
        cart
    });
});

router.post('/:cid/products/:pid', async (req, res)=>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    const cartProduct = await manager.addProductToCart(idCart, idProduct);

        if(cartProduct.cartExist===false){
            return res.send({
                status: 'ERROR!',
                msg: `el producto con el id: ${idProduct} no existe.`
            })
        } else {
            res.send({
                status: 'success',
                msg: `El producto con id: ${idProduct} se agrego al carrito con el id: ${idCart}`
            });
        };
})

router.put('/:cid', async (req, res)=>{
    const idCart = req.params.cid;
    const prod = req.body;

    await manager.updateProduct(idCart, prod)

    return res.send({
            status: 'Success',
            msg: `Se agregaron los productos de forma satisfactoria.`
    })
})

router.put('/:cid/products/:pid', async (req, res)=>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const qty = req.query.qty

    await manager.updateCartQty(idCart,idProduct,qty);
    
    return res.send({
        status: 'Success',
        msg: `Se modifico la cantidad de productos.`
    })
    
})

router.delete('/:cid', async (req, res)=>{

    const idCart = req.params.cid;

    console.log(idCart)

    await manager.deleteAllProductOnCart(idCart)

    res.send({
        status: 'Success',
        msg: `Se eliminaron todos los productos pertenecientes al Carrito: ${idCart}`
    })
})

router.delete('/:cid/product/:pid', async (req, res)=>{
    
    const idCart = req.params.cid;
    const idProd = req.params.pid

    await manager.deleteProductInCart(idCart, idProd)

    return res.send({
        status: 'Success',
        msg: `El producto: ${idProd}, fue eliminado de forma correcta!`
    })
})



export default router;