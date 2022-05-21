import express from 'express'
import homeController from '../controllers/homeController'
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/ad', (req, res) => {
        return res.render("admin.ejs")

    })
    return app.use("/", router)
}

module.exports = initWebRoutes;