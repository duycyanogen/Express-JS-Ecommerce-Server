
import { conn, sql } from '../connect';
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Order] where isCanceled=0";
        let orders = await pool.request().query(sqlString);
        if (orders)
            return (orders.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}
let getOrderByUserID = async (userID) => {
    try {
        let orderData = {};
        let pool = await conn;
        let orders = await pool.request()
            .input('input_parameter', sql.Int, userID)
            .query("select ord.*,g.name,trans.isCanceled as UserCanceled from [Order] ord,[Transaction] trans,Guitar g where ord.transactionID=trans.id and ord.idGuitar=g.id and trans.userID=@input_parameter");

        if (orders){
            orderData.orders=orders.recordsets[0];
            orderData.message="ok"
        }
        else{
            orderData.message="Không tìm thấy user ID"
        }
        return orderData;
    }
    catch (e) {
        return (e);
    }

}

let insert = async (Order) => {
    let orderStatus = {};
    try {

        let pool = await conn;
        let result = await pool.request()
            .input('transactionID', sql.Int, Order.transactionID)
            .input('idGuitar', sql.Int, Order.idGuitar)
            .input('quantity', sql.Int, Order.quantity)
            .input('amount', sql.Decimal, Order.amount)
            .input('created', sql.Date, Order.created)
            .input('updated', sql.Date, Order.updated)
            .input('status', sql.SmallInt, Order.status)
            .input('isCanceled', sql.SmallInt, Order.isCanceled)
            .query("Insert into [dbo].[Order] (transactionID,idGuitar,quantity,amount,created,updated,status,isCanceled) values (@transactionID,@idGuitar,@quantity,@amount,@created,@updated,@status,@isCanceled)");
        orderStatus.errCode = 0;
        orderStatus.message = "Thêm mới thành công!"
        return orderStatus;
    }
    catch (e) {
        orderStatus.errCode = 1;
        orderStatus.message = e.message.substring(0, 100);
        return orderStatus;

    }

}

let update = async (Order) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Order.id)
            .input('transactionID', sql.Int, Order.transactionID)
            .input('idGuitar', sql.Int, Order.idGuitar)
            .input('quantity', sql.Int, Order.quantity)
            .input('amount', sql.Decimal, Order.amount)
            .input('updated', sql.Date, Order.updated)
            .input('status', sql.SmallInt, Order.status)
            .query("Update [dbo].[Order] set transactionID=@transactionID,idGuitar=@idGuitar,quantity=@quantity,amount=@amount,updated=@updated,status=@status where id = @id");
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

let cancelByID = async (id) => {
    //let trans;
    let updateStatus = {};
    try {
        let pool = await conn;
        let result = await pool.request()
            .input('id', sql.Int, id)
            .query("Update [dbo].[Order] set isCanceled=1 where id = @id");
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

let deleted = async (Order) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Order.id)
            .query("Update [dbo].[Order] set isCanceled = 1 where id = @id");
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
    getOrderByUserID:getOrderByUserID,
    insert: insert,
    update: update,
    cancelByID:cancelByID,
    deleted: deleted
}