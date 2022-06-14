
import { conn, sql } from '../connect';
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Transaction] where isCanceled=0";
        let transactions = await pool.request().query(sqlString);
        if (transactions)
            return (transactions.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}
let getTransactionByUserID = async (userID) => {
    try {
        let transactionsData = {};
        let pool = await conn;
        let transactions = await pool.request()
            .input('input_parameter', sql.Int, userID)
            .query("select * from [Transaction] where userID=@input_parameter and isCanceled=0");

        if (transactions){
            transactionsData.transactions=transactions.recordsets[0];
            transactionsData.message="ok"
        }
        else{
            transactionsData.message="Không tìm thấy user ID"
        }
        return transactionsData;
    }
    catch (e) {
        return (e);
    }

}

let insert = async (Transaction) => {
    let tranStatus = {};
    try {

        let pool = await conn;
        let result = await pool.request()
            .input('userID', sql.Int, Transaction.userID)
            .input('customerName', sql.NVarChar, Transaction.customerName)
            .input('customerEmail', sql.NVarChar, Transaction.customerEmail)
            .input('customerPhone', sql.NVarChar, Transaction.customerPhone)
            .input('customerAddress', sql.NVarChar, Transaction.customerAddress)
            .input('amount', sql.Decimal, Transaction.amount)
            .input('message', sql.NVarChar, Transaction.message)
            .input('created', sql.Date, Transaction.created)
            .input('updated', sql.Date, Transaction.updated)
            .input('status', sql.SmallInt, Transaction.status)
            .input('note', sql.NVarChar, Transaction.note)
            .input('isCanceled', sql.SmallInt, Transaction.isCanceled)
            .query("Insert into [dbo].[Transaction] (userID,customerName,customerEmail,customerPhone,customerAddress,amount,message,created,updated,status,note,isCanceled) "
                + "OUTPUT INSERTED.ID "
                + "values (@userID,@customerName,@customerEmail,@customerPhone,@customerAddress,@amount,@message,@created,@updated,@status,@note,@isCanceled)");
        tranStatus.transactionID=Object.values(...result.recordset)[0];
        tranStatus.errCode = 0;
        tranStatus.message = "Thêm mới thành công!"
        return tranStatus;
    }
    catch (e) {
        tranStatus.errCode = 1;
        tranStatus.message = e.message.substring(0, 100);
        return tranStatus;

    }

}

let update = async (Transaction) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Transaction.id)
            .input('userID', sql.Int, Transaction.userID)
            .input('customerName', sql.NVarChar, Transaction.customerName)
            .input('customerEmail', sql.NVarChar, Transaction.customerEmail)
            .input('customerPhone', sql.NVarChar, Transaction.customerPhone) 
            .input('customerAddress', sql.NVarChar, Transaction.customerAddress)
            .input('amount', sql.Decimal, Transaction.amount)
            .input('message', sql.NVarChar, Transaction.message)
            .input('updated', sql.Date, Transaction.updated)
            .input('status', sql.SmallInt, Transaction.status)
            .input('note', sql.NVarChar, Transaction.note)
            .input('isCanceled', sql.SmallInt, Transaction.isCanceled)
            .query("Update [dbo].[Transaction] set userID=@userID,customerName=@customerName,customerEmail=@customerEmail,customerAddress=@customerAddress,amount=@amount,message=@message,updated=@updated,status=@status,note=@note,isCanceled=@isCanceled where id = @id");
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


let deleted = async (Transaction) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Transaction.id)
            .query("Update [dbo].[Transaction] set isCanceled = 1 where id = @id");
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
    getTransactionByUserID:getTransactionByUserID,
    insert: insert,
    update: update,
    deleted: deleted
}