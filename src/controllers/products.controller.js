
class ProductsController {

getProducts = async (req, res)=>{
    const query = req.query.query;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort;

    const products = await productServices.getProducts(query, limit, sort, page);

    res.send({
        status: 'Success',
        payload: products
    })
}

getProductById = async (req, res)=>{
    let id = req.params.pid;

    let product = await productServices.getProductById(id);
        res.send({product}); 
}

addProduct = async (req, res)=>{

    const reqProduct = req.body;
    const product = await productServices.addProduct(reqProduct);
    res.send({
        status: Success,
        product
    });
}

updateProduct = async (req, res)=>{
    
    const reqProduct = req.body;
    
    const id = req.params.pid;

   const updateProduct = await productServices.updateProduct(id, reqProduct);

   return res.send({
        updateProduct
   });
}

deleteProduct = async (req, res)=>{
    
    const id = req.params.pid;

    console.log(id)

    await productServices.deleteProduct(id)

    res.send({
        status: "Success",
        msg: "Producto eliminado"
    });
}

}

export default ProductsController;