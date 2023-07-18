export default class ProductRepository {

    constructor(dao){
        this.dao = dao;
    }

    getProducts = async(limit, page, query, sort) => {
        return await this.dao.getProducts(limit, page, query, sort);
    }
    
    getProductById = async(pid) => {
        return await this.dao.getProductById(pid);
    }

    addProduct = async(prod) => {
        return await this.dao.addProduct(prod);
    }

    updateProduct = async(pid, prod) => {
        return await this.dao.updateProduct(pid, prod);
    }

    deleteProduct = async (pid) => {
        return await this.dao.deleteProduct(pid);
    }
}