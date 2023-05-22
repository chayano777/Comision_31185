import cartModel from './models/cart.model.js';
import productModel from './models/product.model.js';
import ProductManagerDao from './productManagerDao.js';

const manager = new ProductManagerDao();

export default class CartManagerDao {

    getCartProd = async () => {

        try {

            const result = await cartModel.find().lean();
            return result;

        } catch (error) {
            console.log(error)
        }
    }

    getCartProdById = async (cid)=> {

        try {
            
            const result = await cartModel.findOne({_id:cid});
            return result

        } catch (error) {
            console.log(error)
        }
    }

    createCart = async () => {
        
        const cartProduct = {
            
            "products": []
        }
        try {

            const result = await cartModel.create(cartProduct);
            return result;

        } catch (error) {
            console.log(error)
        }
    }

    addProductToCart = async (cid, pid) => {
            const cartProd = await this.getCartProdById(cid);
            const prod = await manager.getProductById(pid);

            if(!cartProd){
                return {
                    cartExist: false,
                    msg: `El carrito con id: ${cid} no existe.`
                }
            }
          
            const productFilter = cartProd.products.find(e=>e.product._id.toString()===pid);

            if(!productFilter){

                cartProd.products.push({
                    product: prod._id,
                    quantity: 1
            })
            } else {
                productFilter.quantity +=1;
            }


        try {

            const result = await cartModel.updateOne({_id: cid}, cartProd)
            return result;
            
        } catch (error) {
            console.log(error)
        }
    }

    updateCart = async (cid, updateProduct) => {

        const cartProd = await this.getCartProdById(cid);

        updateProduct.forEach(async (e) => {
            cartProd.updateProduct.push(e);
        });

        try {
            
            const result = await productModel.updateOne({_id:cid}, updateProduct)
            return result;
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteAllProductOnCart = async (cid) =>{

        const prodCart = await this.getCartProdById(cid)

        const prods = prodCart.products.length;

        if(prods > 0){
            const result = await cartModel.updateOne({_id:cid}, {$pull: {products: {}}})
            return result
        } 
        }
    

    deleteProductInCart = async (cid, pid) =>{

        const prodCart = await this.getCartProdById(cid)

        const prod = prodCart.products.find(e=>e.product._id.toString()===pid)

        if(prod){
            const result = await cartModel.updateOne({_id:cid}, {$pull: {products: {product: pid}}})
            return result
        }else {
            return console.log(`Producto: ${pid}, eliminado de forma correcta!`);       
        }
    }
}