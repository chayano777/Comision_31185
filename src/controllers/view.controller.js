import CartDao from '../Dao/managers/cartManager.js'
import ProductDao from '../Dao/managers/productManager.js'

const productDao = new ProductDao();
const cartDao = new CartDao();

class viewController {

getLogin = async (req, res) => {
    res.render('login');
  }

getRegister = async (req, res) => {
    res.render('register');
  }  

getResetPass = async (req, res) => {
    res.render('resetPassword');
  }  

getProfile = async (req, res) => {
    res.render('profile', {
      user: req.session.user
    });
  }

getRealTimeProducts = (req, res) => {

    res.render('realTimeProducts', {})
  }  

getChat = (req, res) => {
    res.render('chat', {});
  }  

getViewProducts = async (req, res) => {

    const page = req.query.page || 1;
  
    const { products, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productDao.getProducts('', 3, page, 'desc')
  
    res.render('products',
      {
        products,
        prevPage,
        nextPage,
        totalPages,
        hasPrevPage,
        hasNextPage,
        user: req.session.user
      });
  }

getViewCart = async (req, res) => {
    const result = await cartDao.getCartProdById(req.params.cid);
    const products = result.products;
    res.render('cartId', { products });
  }
  
}

export default viewController;