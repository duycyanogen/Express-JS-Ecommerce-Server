
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
            .query("select image, g.price, g.discount, sc.id ,userID , sc.idGuitar,g.name as guitarName,quantity,amount,sc.created,sc.updated from ShopCart sc,Guitar g, Image i where sc.idGuitar=g.id and g.id = i.idGuitar and userID=@input_parameter and isOrdered=0");

        if (shopCarts) {
            cartsData.shopCarts = shopCarts.recordsets[0];
            cartsData.message = "ok"
        }
        else {
            cartsData.message = "Không tìm thấy user ID"
        }
        return cartsData;
    }
    catch (e) {
        return (e);
    }

}

let insert = async (ShopCart) => {

    let Status = {};
    try {

        let pool = await conn;
        let value = await pool.request()
            .input('userID', sql.Int, ShopCart.userID)
            .input('idGuitar', sql.Int, ShopCart.idGuitar)
            .query("select COUNT(*)as count from ShopCart where userID=@userID and idGuitar=@idGuitar and isOrdered=0");
        if (value.recordsets[0][0].count > 0) {
            let update = await pool.request()
                .input('userID', sql.Int, ShopCart.userID)
                .input('idGuitar', sql.Int, ShopCart.idGuitar)
                .query("Update [dbo].[ShopCart] set amount=amount+(amount/quantity),quantity=(quantity+1) where userID=@userID and idGuitar=@idGuitar and isOrdered=0");
        } else {
            let result = await pool.request()
                .input('userID', sql.Int, ShopCart.userID)
                .input('idGuitar', sql.Int, ShopCart.idGuitar)
                .input('quantity', sql.Int, ShopCart.quantity)
                .input('amount', sql.Decimal, ShopCart.amount)
                .input('created', sql.Date, ShopCart.created)
                .input('updated', sql.Date, ShopCart.updated)
                .input('isOrdered', sql.SmallInt, ShopCart.isOrdered)
                .query("Insert into [dbo].[ShopCart] (userID,idGuitar,quantity,amount,created,updated,isOrdered) values (@userID,@idGuitar,@quantity,@amount,@created,@updated,@isOrdered)");
        }

        Status.errCode = 0;
        Status.message = "Thêm mới thành công!"
        return Status;
    }
    catch (e) {
        Status.errCode = 1;
        Status.message = e.message.substring(0, 100);
        return Status;

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

let updateIsOrdered = async (id) => {
    //let trans;
    let updateStatus = {};
    try {
        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, id)
            .query("Update [dbo].[ShopCart] set isOrdered=1 where id = @id");
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
            .query("DELETE FROM ShopCart WHERE id=@id");
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
    getShopCartByUserID: getShopCartByUserID,
    insert: insert,
    update: update,
    deleted: deleted,
    updateIsOrdered: updateIsOrdered
}