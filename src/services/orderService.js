
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let pool = await conn;
            let sqlString = "select * from [dbo].[Order]";
            let orders = await pool.request().query(sqlString);
            if (orders)
                resolve(orders.recordsets)
            else
                resolve(null)
        }
        catch (e) {
            reject(e);
        }
    })

}



module.exports = {
    getAll: getAll
}