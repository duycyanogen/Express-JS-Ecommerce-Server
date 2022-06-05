import express from 'express'
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import homeController from '../controllers/homeController'
import guitarController from '../controllers/guitarController'
import userController from '../controllers/userController'
import orderController from '../controllers/orderController'
import categoryController from '../controllers/categoryController'
import colorController from '../controllers/colorController'
import shopCartController from '../controllers/shopCartController'
import transactionController from '../controllers/transactionController'
import imageController from '../controllers/imageController'
import { response } from 'express';
import { request } from 'https';
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

    //upload image
    router.post('/api/v1/upload', async (req, res) => {

        const form = new formidable.IncomingForm();
        const uploadFolder = path.join(__dirname, "..", "uploads");
        form.options.uploadDir = uploadFolder;
        form.uploadDir = uploadFolder;
        console.log(form.uploadDir);
        form.options.keepExtensions = true;
        form.options.maxFieldSizes = 10 * 1024 * 1024;
        form.options.multiples = true;
        form.parse(req, (err, fields, files) => {
            //console.log(files);
            if (err) {
                res.json({
                    result: "Lỗi",
                    data: {},
                    message: `Không thể upload file, ${err}`
                })
                return;

            }
            else {
                let arrayOfFile = files[""];
                if (arrayOfFile.length > 0) {
                    let fileNames = [];
                    arrayOfFile.forEach((file) => {
                        fileNames.push(file.newFilename);
                    })
                    res.json({
                        result: "ok",
                        data: fileNames,
                        numberOfImages: fileNames.length,
                        message: `Upload file thành công!`
                    })
                }
                else {
                    res.json({
                        result: "Lỗi",
                        data: {},
                        numberOfImages: 0,
                        message: `Không có file nào được upload`
                    })
                }
            }
        })

    })

    router.get('/api/v1/image1', async (req, res) => {
        const uploadFolder = path.join(__dirname, "..", "uploads");
        let imageName = `${uploadFolder}\\${req.body.imageName}`;
        console.log(imageName);
        try {
            fs.readFile(imageName, (err, imageData) => {
                if (err) {
                    console.log(err);
                    res.json({
                        result: "Lỗi",
                        data: {},
                        numberOfImages: 0,
                        message: `Lỗi đọc file!`
                    })
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