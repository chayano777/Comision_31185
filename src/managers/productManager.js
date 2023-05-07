import fs from 'fs';


export default class ProductManager {
    constructor(){
        this.path = './src/files/products.json';
    }

    validateField(){
        throw('Error - Campo sin parametro');    
    }

    getProducts = async () =>{
       
        if(!fs.existsSync(this.path)){
            return [];
        }
        
        const products = await fs.promises.readFile(this.path, 'utf-8');
        
        const productsJSON = JSON.parse(products);
                
        return productsJSON;
    }

    getProductById = async (id) =>{

        const products = await this.getProducts();
                
        const product = products.filter( e => e.id === parseInt(id))

        return product;
    }

    addProduct = async (product=this.validateField()) =>{
     
        let products = await this.getProducts();
        
        if(products.length === 0 ){
            product.id = 1;
            product.status = true;
        } else {
            product.id = products[products.length -1 ].id + 1;
        }

        let numCode = products.find((e) => e.code === product.code);

        if(numCode){
            return 'El codigo de producto no puede estar presente en 2 productos';
        }

        products.push(product);

        try {

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            return 'Producto agregado'

        } catch (error) {
            console.log(error);
        }

    }

    /*updateProduct = async (idProd, updateProd) =>{

        let products = await this.getProducts();
        

        let product = await products.map((prod)=> { if(prod.id === idProd){
            return {...prod, ...updateProd}
        }else {
            return prod;
        }
        
        })
            
        try {
            
            await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'))

            return products;

        } catch (error) {
            console.log(error);
        }
    }*/

    /*updateProduct = async (id, title, price, stock, thumbnail, description, status, category, code) => {
        //console.log(`------------------> ${title}`)
        const products = await this.getProducts();

        let indexProduct = products.findIndex((e)=>{
            return e.id === id;
        })
        //console.log(`-----------------> ${indexProduct}`)

        products[indexProduct].title = title;
        products[indexProduct].price = price;
        products[indexProduct].stock = stock;
        products[indexProduct].thumbnail = thumbnail;
        products[indexProduct].description = description;
        products[indexProduct].status=status;
        products[indexProduct].category=category;
        products[indexProduct].code = code;

        try {

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
            return 'Producto Modificado';

        } catch (error) {
            return error;
        }
    }*/

    updateProduct = async (id_prod, update_prod) => {
        
        const products = await this.getProducts();

        const id = parseInt(id_prod);
        
        const index_prod = products.findIndex(e => e.id === id);
        
        if(index_prod === -1){
            return 'No Existe el producto'
        }

        update_prod.id = id;

        

        products[index_prod] = {...products[index_prod], ...update_prod};

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
            return "Producto modificado"

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{

        const products = await this.getProducts();
        
        let indexProduct = products.findIndex((e)=>{
            return e.id === parseInt(id);
        })

        if(indexProduct===-1){
            return {
                existe: false
            }
        }

        products.splice(indexProduct, 1);

        try {      
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8')
            return products[id]

        } catch (error) {
            console.log(error);
        }

    }
}