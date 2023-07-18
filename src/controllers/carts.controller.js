import { cartServices } from '../repository/index.js';


class CartsController {

getCartProd = async (req, res)=>{
    const carts = await cartServices.getCartProd();

    res.send({carts});
}

getCartProdById = async (req, res)=>{
    const cid = req.params.id;

    const cart = await cartServices.getCartProdById(cid);


    if(!cart){
        return res.send({
            status: 'Error',
            msg: `Carrito con ID: ${cid}, inexistente. `
        })
    }

    res.send({cart})
}

createCart = async (req, res)=>{
    const cart = await cartServices.createCart();

    res.send({
        status: 'Success',
        cart
    });
}

addProductToCart = async (req, res)=>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    const cartProduct = await cartServices.addProductToCart(idCart, idProduct);

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
}

updateProduct = async (req, res)=>{
    const idCart = req.params.cid;
    const prod = req.body;

    await cartServices.updateProduct(idCart, prod)

    return res.send({
            status: 'Success',
            msg: `Se agregaron los productos de forma satisfactoria.`
    })
}

updateCartQty = async (req, res)=>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const qty = req.query.qty

    await cartServices.updateCartQty(idCart,idProduct,qty);
    
    return res.send({
        status: 'Success',
        msg: `Se modifico la cantidad de productos.`
    })
}

deleteAllProductOnCart = async (req, res)=>{

    const idCart = req.params.cid;

    console.log(idCart)

    await cartServices.deleteAllProductOnCart(idCart)

    res.send({
        status: 'Success',
        msg: `Se eliminaron todos los productos pertenecientes al Carrito: ${idCart}`
    })
}

deleteProductInCart = async (req, res)=>{
    
    const idCart = req.params.cid;
    const idProd = req.params.pid

    await cartServices.deleteProductInCart(idCart, idProd)

    return res.send({
        status: 'Success',
        msg: `El producto: ${idProd}, fue eliminado de forma correcta!`
    })
}

}

export default CartsController;