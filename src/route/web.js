import express from 'express'
import homeController from '../controllers/homeController'
import guitarController from '../controllers/guitarController'
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/guitar', guitarController.getAllGuitar);
    return app.use("/", router)
}

module.exports = initWebRoutes;