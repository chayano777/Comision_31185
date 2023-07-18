export default class CartRepository {

constructor(dao) {
    this.dao = dao;
}

getCartProd = async () => {
    return await this.dao.getCartProd();
}

getCartProdById = async () => {
    return await this.dao.getCartProdById();
}

createCart = async () => {
    return await this.dao.createCart();
}

addProductToCart = async (cid, pid) => {
    return await this.dao.addProductToCart(cid, pid);
}

updateProduct = async (cid, prod) => {
    return await this.dao.updateProduct(cid, prod);
}

updateCartQty = async (cid, pid, qty) => {
    return await this.dao.updateCartQty(cid, pid, qty);
}

deleteAllProductOnCart = async (cid) => {
    return await this.dao.deleteAllProductOnCart(cid);
}

deleteProductInCart = async (cid, pid) => {
    return await this.dao.deleteProductInCart(cid, pid);
}
}