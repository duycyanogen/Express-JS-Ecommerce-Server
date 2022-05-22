
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Guitar] where isDeleted = 0";
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

let insert = async (Guitar) => {
    //let trans;
    let regisStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('name', sql.NVarChar, Guitar.name)
            .input('price', sql.Decimal, Guitar.price)
            .input('contents', sql.NVarChar, Guitar.contents)
            .input('discount', sql.Decimal, Guitar.discount)
            .input('views', sql.Int, Guitar.views)
            .input('created', sql.Date, Guitar.created)
            .input('isDeleted', sql.SmallInt, Guitar.isDeleted)
            .query("Insert into [dbo].[Guitar] (name,price,contents,discount,views,created,isDeleted) values (@name,@price,@contents,@discount,@views,@created,@isDeleted)");
        regisStatus.errCode = 0;
        regisStatus.message = "Thêm mới thành công!"
        return regisStatus;
    }
    catch (e) {
        regisStatus.errCode = 1;
        regisStatus.message = e.message.substring(0, 100);
        return regisStatus;
        //trans.rollback();

    }

}

let update = async (Guitar) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Guitar.id)
            .input('name', sql.NVarChar, Guitar.name)
            .input('price', sql.Decimal, Guitar.price)
            .input('contents', sql.NVarChar, Guitar.contents)
            .input('discount', sql.Decimal, Guitar.discount)
            .input('views', sql.Int, Guitar.views)
            .input('updated', sql.Date, Guitar.updated)
            .query("Update [dbo].[Guitar] set (name = @name,price = @price,contents=@contents,discount=@discount,views=@views, updated = @updated) where id = @id");
        updateStatus.errCode = 0;
        updateStatus.message = "Thay đổi thông tin thành công!"
        return updateStatus;
    }
    catch (e) {
        updateStatus.errCode = 1;
        updateStatus.message = e.message.substring(0, 100);
        return updateStatus;
        //trans.rollback();

    }

}


let deleted = async (Guitar) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Guitar.id)
            .query("Update [dbo].[Guitar] set (isDeleted = 1) where id = @id");
        updateStatus.errCode = 0;
        updateStatus.message = "Thay đổi thông tin thành công!"
        return updateStatus;
    }
    catch (e) {
        updateStatus.errCode = 1;
        updateStatus.message = e.message.substring(0, 100);
        return updateStatus;
        //trans.rollback();

    }

}



module.exports = {
    getAll: getAll,
    insert: insert,
    update: update,
    deleted: deleted
}