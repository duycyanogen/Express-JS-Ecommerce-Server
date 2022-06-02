
import { conn, sql } from '../connect';
let getAll = async() => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Image] where [Image].isDeleted=0";
        let images = await pool.request().query(sqlString);
        if (images)
            return (images.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}

let getImageByidGuitar = async (idGuitar) => {
    try {
        let imageData = {};
        let pool = await conn;
        let images = await pool.request()
            .input('input_parameter', sql.Int, idGuitar)
            .query("select * from [Image] where [Image].idGuitar= @input_parameter and [Image].isDeleted=0");

        if (images){
            imageData.images=images.recordsets[0];
            imageData.message="ok"
        }
        else{
            imageData.message="Không tìm thấy id guitar"
        }
        return imageData;
    }
    catch (e) {
        return (e);
    }

}


let insert = async (Image) => {
    //let trans;
    let regisStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('idGuitar', sql.Int, Image.idGuitar)
            .input('image', sql.NVarChar, Image.image)
            .input('imgDetail', sql.NVarChar, Image.imgDetail)
            .input('isDeleted', sql.SmallInt, Image.isDeleted)
            .query("Insert into [dbo].[Image] (idGuitar,image,imgDetail,isDeleted) values (@idGuitar,@image,@imgDetail,@isDeleted)");
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

let update = async (Image) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        let result = await pool.request()
            .input('id', sql.Int, Image.id)
            .input('idGuitar', sql.Int, Image.idGuitar)
            .input('image', sql.NVarChar, Image.image)
            .input('imgDetail', sql.NVarChar, Image.imgDetail)
            .query("Update [dbo].[Image] set idGuitar = @idGuitar,image = @image,imgDetail=@imgDetail where id = @id");
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


let deleted = async (Image) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('id', sql.Int, Image.id)
            .query("Update [dbo].[Image] set isDeleted = 1 where id = @id");
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
    getImageByidGuitar: getImageByidGuitar,
    insert: insert,
    update:update,
    deleted: deleted
}