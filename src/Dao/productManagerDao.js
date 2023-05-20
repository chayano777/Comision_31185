import productModel from './models/product.model.js';

export default class ProductManagerDao{

    //metodos

    getProducts = async () =>{
        
        try {
            

            const {docs, page, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages, sort} = await productModel.paginate({},{limit:10, page:1, sort:{price:1}, lean:true})

            const products = docs;

            return {
                products,
                page,
                prevPage,
                nextPage,
                totalPages,
                hasPrevPage, 
                hasNextPage,
            };
            

        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (pid) =>{
        try {  
            const product = await productModel.findOne({_id:pid})
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
            status: status || true  
        }

        try {
            const result = await productModel.create(newProduct)
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{

        console.log(id)
        try {      
            const result = await productModel.deleteOne({_id:id})
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (pid, updateProduct) => {

        try {
            
            const result = await productModel.updateOne({_id:pid}, {$set: updateProduct})
            return result;
            
        } catch (error) {
            console.log(error);
        }
    }


}