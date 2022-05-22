
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Guitar]";
        let guitars = await pool.request().query(sqlString);
        if (guitars)
            return (guitars.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}



module.exports = {
    getAll: getAll
}