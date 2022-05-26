
import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import cors from 'cors'
require('dotenv').config()
const app = express();
app.use(cors({ origin: true }));
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoutes(app);

app.listen(port, 'localhost', () => {
    console.log(`Node is running on: http://localhost:${port}`);
})