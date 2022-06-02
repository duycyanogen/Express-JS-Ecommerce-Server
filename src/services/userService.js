
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = async () => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[User]";
        let users = await pool.request().query(sqlString);
        console.log("users", users)
        if (users)
            return (users.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }

}

let findByEmail = async (email) => {
    try {
        let pool = await conn;
        let users = await pool.request()
            .input('input_parameter', sql.NVarChar, email)
            .query("SELECT * from [dbo].[User] where email = @input_parameter");

        if (users)
            return (users.recordsets[0][0])
        else
            return ([])
    }
    catch (e) {
        return (e);
    }

}

let handleUserLogin = async (email, password) => {
    try {
        let userData = {};
        let user = await findByEmail(email);
        if (user) {
            let user = await findByEmail(email);
            if (user) {
                if (password != user.password) {
                    userData.errCode = 3;
                    userData.message = "Mật khẩu không đúng";
                }
                else {
                    userData.errCode = 0;
                    userData.message = "OK";
                    userData.user = user;
                }
            }
            else {
                userData.errCode = 2;
                userData.message = "Không tìm thấy user"
            }
        }
        return (userData)
    }
    catch (e) {
        userData.errCode = 500;
        userData.message = e.message.substring(0, 100);
        return (userData);
    }
}

let insert = async (user) => {
    //let trans;
    let regisStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('name', sql.NVarChar, user.name)
            .input('email', sql.NVarChar, user.email)
            .input('phone', sql.NVarChar, user.phone)
            .input('address', sql.NVarChar, user.address)
            .input('password', sql.NVarChar, user.password)
            .input('created', sql.Date, user.created)
            .input('updated', sql.Date, user.updated)
            .input('isDeleted', sql.SmallInt, user.isDeleted)
            .input('idRole', sql.Int, user.idRole)
            .query("Insert into [dbo].[User] (name,email,phone,address,password,created,updated,isDeleted,idRole) values (@name,@email,@phone,@address,@password,@created,@updated,@isDeleted,@idRole)");
        regisStatus.errCode = 0;
        regisStatus.message = "Đăng kí tài khoản thành công!"
        return regisStatus;
    }
    catch (e) {
        regisStatus.errCode = 1;
        regisStatus.message = e.message.substring(0, 100);
        return regisStatus;
        //trans.rollback();

    }

}

let update = async (user) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, user.id)
            .input('name', sql.NVarChar, user.name)
            .input('phone', sql.NVarChar, user.phone)
            .input('address', sql.NVarChar, user.address)
            .input('isDeleted', sql.SmallInt, user.isDeleted)
            .input('idRole', sql.Int, user.idRole)
            .input('updated', sql.Date, user.updated)
            .query("Update [dbo].[User] set name = @name,phone = @phone,address=@address,isDeleted=@isDeleted,idRole=@idRole, updated = @updated where id = @id");
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


let deleted = async (user) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, user.id)
            .query("Update [dbo].[User] set isDeleted = 1 where id = @id");
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
    handleUserLogin: handleUserLogin,
    insert: insert,
    update: update,
    deleted: deleted
}