
import { conn, sql } from '../connect';
//var conn = require('../connect')
let getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let pool = await conn;
            let sqlString = "select * from [dbo].[User]";
            let users = await pool.request().query(sqlString);
            console.log("users", users)
            if (users)
                resolve(users.recordsets)
            else
                resolve(null)
        }
        catch (e) {
            reject(e);
        }
    })

}

let findByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let pool = await conn;
            let users = await pool.request()
                .input('input_parameter', sql.NVarChar, email)
                .query("SELECT * from [dbo].[User] where email = @input_parameter");

            if (users)
                resolve(users.recordsets[0][0])
            else
                resolve(null)
        }
        catch (e) {
            reject(e);
        }
    })

}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await findByEmail(email);
            console.log(user);
            console.log(password)
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
            resolve(userData)
        }
        catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    getAll: getAll,
    handleUserLogin: handleUserLogin
}