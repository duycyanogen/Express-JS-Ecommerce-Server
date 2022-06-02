import express from 'express'
import homeController from '../controllers/homeController'
import guitarController from '../controllers/guitarController'
import userController from '../controllers/userController'
import orderController from '../controllers/orderController'
import categoryController from '../controllers/categoryController'
import colorController from '../controllers/colorController'
import shopCartController from '../controllers/shopCartController'
import transactionController from '../controllers/transactionController'
import imageController from '../controllers/imageController'
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    //guitar
    router.get('/api/v1/guitar', guitarController.getAllGuitar);
    router.post('/api/v1/guitar/add', guitarController.insert);
    router.post('/api/v1/guitar/update', guitarController.update);
    router.post('/api/v1/guitar/delete', guitarController.deleted);
    //user
    router.get('/api/v1/user', userController.getAllUser);
    router.post('/api/v1/user/update', userController.update);
    router.post('/api/v1/user/delete', userController.deleted);
    router.post('/api/v1/login', userController.handleLogin);
    router.post('/api/v1/regis', userController.handleRegis);

    //order
    router.get('/api/v1/order', orderController.getAllOrder);
    router.post('/api/v1/order/add', orderController.insert);
    router.post('/api/v1/order/update', orderController.update);
    router.post('/api/v1/order/delete', orderController.deleted);

    //shopcart
    router.get('/api/v1/cart',shopCartController.getAllShopCart);
    router.post('/api/v1/cart/add', shopCartController.insert);
    router.post('/api/v1/cart/update', shopCartController.update);
    router.post('/api/v1/cart/delete', shopCartController.deleted);
    router.post('/api/v1/getCart', shopCartController.getShopCartByUserID);

    //transaction
    router.get('/api/v1/transaction',transactionController.getAllTransaction);
    router.post('/api/v1/transaction/add', transactionController.insert);
    router.post('/api/v1/transaction/update', transactionController.update);
    router.post('/api/v1/transaction/delete', transactionController.deleted);
    router.post('/api/v1/getTransaction', transactionController.getTransactionByUserID);


    //category
    router.get('/api/v1/category', categoryController.getAllCategory);
    router.post('/api/v1/getCategory', categoryController.getCategory);
    router.post('/api/v1/category/add', categoryController.insert);
    router.post('/api/v1/category/delete', categoryController.deleted);
    
    //color
    router.get('/api/v1/color', colorController.getAllColor);
    router.post('/api/v1/getColor', colorController.getColor);
    router.post('/api/v1/color/add', colorController.insert);
    router.post('/api/v1/color/delete', colorController.deleted);

    //image
    router.get('/api/v1/image', imageController.getAllImage);
    router.post('/api/v1/getImage', imageController.getImage);
    router.post('/api/v1/image/add', imageController.insert);
    router.post('/api/v1/image/update', imageController.update);
    router.post('/api/v1/image/delete', imageController.deleted);

    return app.use("/", router)
}

module.exports = initWebRoutes;