
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select g.id,name,price,contents,discount,views,image from [dbo].[Guitar] g,Image i where g.isDeleted = 0 and g.id=i.idGuitar and g.isDeleted=0";
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
    let data = {};
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
            .query("Insert into [dbo].[Guitar] (name,price,contents,discount,views,created,isDeleted) "
                + "OUTPUT INSERTED.ID "
                + "values (@name,@price,@contents,@discount,@views,@created,@isDeleted)");
        data.guitarID = Object.values(...result.recordset)[0];
        if (data.guitarID) {
            await pool.request()
                .input('idGuitar', sql.Int, data.guitarID)
                .input('image', sql.NVarChar, Guitar.fileName)
                .input('imgDetail', sql.NVarChar, null)
                .input('isDeleted', sql.SmallInt, 0)
                .query("Insert into [dbo].[Image] (idGuitar,image,imgDetail,isDeleted) values (@idGuitar,@image,@imgDetail,@isDeleted)");
        }

        data.errCode = 0;
        data.message = "Thêm mới thành công!"
        return data;
    }
    catch (e) {
        data.errCode = 1;
        data.message = e.message.substring(0, 100);
        return data;
        //trans.rollback();

    }

}


let update = async (Guitar) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        let result = await pool.request()
            .input('id', sql.Int, Guitar.id)
            .input('name', sql.NVarChar, Guitar.name)
            .input('price', sql.Decimal, Guitar.price)
            .input('contents', sql.NVarChar, Guitar.contents)
            .input('discount', sql.Decimal, Guitar.discount)
            .input('views', sql.Int, Guitar.views)
            .input('updated', sql.Date, Guitar.updated)
            .query("Update [dbo].[Guitar] set name = @name,price = @price,contents=@contents,discount=@discount,views=@views, updated = @updated where id = @id");

        await pool.request()
            .input('idGuitar', sql.Int, Guitar.id)
            .input('image', sql.NVarChar, Guitar.fileName)
            .input('imgDetail', sql.NVarChar, null)
            .input('isDeleted', sql.SmallInt, 0)
            .query("Update [dbo].[Image] set image = @image,isDeleted = 0 where idGuitar = @idGuitar");

        console.log(Guitar.id);
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
            .query("Update [dbo].[Guitar] set isDeleted = 1 where id = @id");
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