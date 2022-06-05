
import { conn, sql } from '../connect';
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[ShopCart] where isOrdered=0";
        let carts = await pool.request().query(sqlString);
        if (carts)
            return (carts.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}
let getShopCartByUserID = async (userID) => {
    try {
        let cartsData = {};
        let pool = await conn;
        let shopCarts = await pool.request()
            .input('input_parameter', sql.Int, userID)
            .query("select * from ShopCart where userID=@input_parameter and isOrdered=0");

        if (shopCarts){
            cartsData.shopCarts=shopCarts.recordsets[0];
            cartsData.message="ok"
        }
        else{
            cartsData.message="Không tìm thấy user ID"
        }
        return cartsData;
    }
    catch (e) {
        return (e);
    }

}

let insert = async (ShopCart) => {
    let regisStatus = {};
    try {

        let pool = await conn;
        let result = await pool.request()
            .input('userID', sql.Int, ShopCart.userID)
            .input('idGuitar', sql.Int, ShopCart.idGuitar)
            .input('quantity', sql.Int, ShopCart.quantity)
            .input('amount', sql.Decimal, ShopCart.amount)
            .input('created', sql.Date, ShopCart.created)
            .input('updated', sql.Date, ShopCart.updated)
            .input('isOrdered', sql.SmallInt, ShopCart.isOrdered)
            .query("Insert into [dbo].[ShopCart] (userID,idGuitar,quantity,amount,created,updated,isOrdered) values (@userID,@idGuitar,@quantity,@amount,@created,@updated,@isOrdered)");
        regisStatus.errCode = 0;
        regisStatus.message = "Thêm mới thành công!"
        return regisStatus;
    }
    catch (e) {
        regisStatus.errCode = 1;
        regisStatus.message = e.message.substring(0, 100);
        return regisStatus;

    }

}

let update = async (ShopCart) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, ShopCart.id)
            .input('userID', sql.Int, ShopCart.userID)
            .input('idGuitar', sql.Int, ShopCart.idGuitar)
            .input('quantity', sql.Int, ShopCart.quantity)
            .input('amount', sql.Decimal, ShopCart.amount)
            .input('updated', sql.Date, ShopCart.updated)
            .query("Update [dbo].[ShopCart] set userID=@userID,idGuitar=@idGuitar,quantity=@quantity,amount=@amount,updated=@updated where id = @id");
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


let deleted = async (ShopCart) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, ShopCart.id)
            .query("Update [dbo].[ShopCart] set isOrdered = 1 where id = @id");
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
    getShopCartByUserID:getShopCartByUserID,
    insert: insert,
    update: update,
    deleted: deleted
}