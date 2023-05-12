import productModel from './models/product.model.js';

export default class ProductManagerDao{

    //metodos

    getProducts = async () =>{
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (error) {
            console.log(error);
        }        
    }

    getProductById = async (pid) =>{
        try {
            
            const product = await productModel.findOne({pid:pid})
            return product;

        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) =>{
     
        const { title, description, code, price, stock, category, thumbnail, status } = product;
        
        if(!title || !description || !code || !price || !stock || !category){
            return {
                fields: true 
            }
        }

        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail,
            status: status  
        }

        const products = await this.getProducts(); 
        if(products.length === 0 ){
            newProduct.pid = 1;
        } else {
            newProduct.pid = products[products.length -1 ].pid + 1;
        }

        try {
            const result = await productModel.create(newProduct)
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (pid) =>{

        try {      
            
            const result = await productModel.deleteOne({pid:pid})
            console.log(result)
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (pid, updateProduct) => {

        try {
            
            const result = await productModel.updateOne({pid:pid}, {$set: updateProduct})
            return result;
            
        } catch (error) {
            console.log(error);
        }
    }


}