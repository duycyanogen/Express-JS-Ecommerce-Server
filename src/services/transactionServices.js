
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let pool = await conn;
            let sqlString = "select * from [dbo].[Transaction]";
            let transactions = await pool.request().query(sqlString);
            if (transactions)
                resolve(transactions.recordsets)
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