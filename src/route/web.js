import express from 'express'
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import homeController from '../controllers/homeController'
import guitarController from '../controllers/guitarController'
import userController from '../controllers/userController'
import orderController from '../controllers/orderController'
import categoryController from '../controllers/categoryController'
import shopCartController from '../controllers/shopCartController'
import transactionController from '../controllers/transactionController'
import imageController from '../controllers/imageController'
import multer from 'multer';
import sharp from 'sharp';
import { response } from 'express';
import { request } from 'https';
let router = express.Router();
const uploadFolder = path.join(__dirname, "..", "uploads");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })
let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    //guitar
    router.get('/api/v1/guitar', guitarController.getAllGuitar);
    router.post('/api/v1/guitar/add', upload.single("file"), guitarController.insert);
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
    router.post('/api/v1/getOrder', orderController.getOrderByUserID);
    router.post('/api/v1/cancelOrder', orderController.cancelByID);
    router.post('/api/v1/confirmOrder', orderController.confirmByID);
    //shopcart
    router.get('/api/v1/cart', shopCartController.getAllShopCart);
    router.post('/api/v1/cart/add', shopCartController.insert);
    router.post('/api/v1/cart/update', shopCartController.update);
    router.post('/api/v1/cart/delete', shopCartController.deleted);
    router.post('/api/v1/getCart', shopCartController.getShopCartByUserID);

    //transaction
    router.get('/api/v1/transaction', transactionController.getAllTransaction);
    router.post('/api/v1/transaction/add', transactionController.insert);
    router.post('/api/v1/transaction/update', transactionController.update);
    router.post('/api/v1/transaction/delete', transactionController.deleted);
    router.post('/api/v1/getTransaction', transactionController.getTransactionByUserID);


    //category
    router.get('/api/v1/category', categoryController.getAllCategory);
    router.post('/api/v1/getCategory', categoryController.getCategory);
    router.post('/api/v1/category/add', categoryController.insert);
    router.post('/api/v1/category/delete', categoryController.deleted);

    //image
    router.get('/api/v1/image', imageController.getAllImage);
    router.post('/api/v1/getImage', imageController.getImage);
    router.post('/api/v1/image/add', imageController.insert);
    router.post('/api/v1/image/update', imageController.update);
    router.post('/api/v1/image/delete', imageController.deleted);

    router.post('/api/v1/upload', upload.single("file"), (req, res) => {
        console.log(req.file);
        const uploadFolder = path.join(__dirname, "..", "uploads");
        let imageName = `${uploadFolder}\\${req.file.filename}`;
        sharp(imageName).resize(600, 600).toFile(imageName.split('.')[0] + "_600x600." + imageName.split('.')[1], function (err) {
            if (err) {
                res.json({
                    result: "failed",
                    message: `Upload thất bại! ${err}`
                })
            }
        })
        res.json({
            result: "ok",
            message: `Upload file thành công!`
        })

    })

    router.get('/api/v1/image1', async (req, res) => {

        try {
            const uploadFolder = path.join(__dirname, "..", "uploads");
            let imageName = `${uploadFolder}\\${req.query.imageName}`;
            console.log(req.query)
            fs.readFile(imageName, (err, imageData) => {
                if (err) {
                    console.log(err);
                    res.json({
                        result: "Lỗi",
                        data: {},
                        numberOfImages: 0,
                        message: `Lỗi đọc file!`
                    })
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(imageData);
            })
        } catch (error) {
            res.json({
                result: "Lỗi",
                data: {},
                numberOfImages: 0,
                message: `Lỗi đọc file! + ${error}`
            })
        }

    })

    const isFileValid = (file) => {
        const type = file.type.split("/").pop();
        const validTypes = ["jpg", "jpeg", "png", "pdf"];
        if (validTypes.indexOf(type) === -1) {
            return false;
        }
        return true;
    };

    return app.use("/", router)
}

module.exports = initWebRoutes;