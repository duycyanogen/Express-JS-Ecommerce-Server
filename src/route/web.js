import express from 'express'
import homeController from '../controllers/homeController'
import guitarController from '../controllers/guitarController'
import userController from '../controllers/userController'
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/api/v1/guitar', guitarController.getAllGuitar);
    router.post('/api/v1/guitar/add', guitarController.add);
    router.post('/api/v1/guitar/update', guitarController.update);
    router.post('/api/v1/guitar/delete', guitarController.deleted);

    router.get('/api/v1/user', userController.getAllUser);
    router.get('/api/v1/user/update', userController.update);
    router.get('/api/v1/user/delete', userController.deleted);
    router.post('/api/v1/login', userController.handleLogin);
    router.post('/api/v1/regis', userController.handleRegis);
    return app.use("/", router)
}

module.exports = initWebRoutes;