import cartModel from './models/cart.model.js';
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
            return result;

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

          
            const productFilter = cartProd.products.find(e=>e.id===pid);

            if(!productFilter || productFilter.id != pid ){

                cartProd.products.push({
                    product: prod.pid,
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
}