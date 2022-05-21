import express from 'express'
import homeController from '../controllers/homeController'
import guitarController from '../controllers/guitarController'
import userController from '../controllers/userController'
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/guitar', guitarController.getAllGuitar);
    router.get('/user', userController.getAllUser);
    router.post('/login', userController.handleUserLogin);
    return app.use("/", router)
}

module.exports = initWebRoutes;