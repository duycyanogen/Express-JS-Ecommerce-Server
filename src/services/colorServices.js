
import { conn, sql } from '../connect';
let getAll = async() => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Color]";
        let colors = await pool.request().query(sqlString);
        if (colors)
            return (colors.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}

let getColorByidGuitar = async (idGuitar) => {
    try {
        let colorData = {};
        let pool = await conn;
        let colors = await pool.request()
            .input('input_parameter', sql.Int, idGuitar)
            .query("select co.name from Guitar_Color gco,Color co where gco.idColor=co.id and gco.idGuitar= @input_parameter");

        if (colors){
            colorData.colors=colors.recordsets[0];
            colorData.message="ok"
        }
        else{
            colorData.message="Không tìm thấy id guitar"
        }
        return colorData;
    }
    catch (e) {
        return (e);
    }

}


let insert = async (Guitar_Color) => {
    //let trans;
    let regisStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('idGuitar', sql.Int, Guitar_Color.idGuitar)
            .input('idColor', sql.Int, Guitar_Color.idColor)
            .query("Insert into [dbo].[Guitar_Color] (idGuitar,idColor) values (@idGuitar,@idColor)");
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



let deleted = async (Guitar_Color) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('idGuitar', sql.Int, Guitar_Color.idGuitar)
            .input('idColor', sql.Int, Guitar_Color.idColor)
            .query("DELETE FROM [dbo].[Guitar_Color]  where idGuitar = @idGuitar and idColor=@idColor");
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
    getColorByidGuitar: getColorByidGuitar,
    insert: insert,
    deleted: deleted
}