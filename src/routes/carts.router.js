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

    const cart = await manager.getCartById(cid);

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
                status: success,
                msg: `El producto con id: ${idProduct} se agrego al carrito con el id: ${idCart}`
            });
        };


})

export default router;