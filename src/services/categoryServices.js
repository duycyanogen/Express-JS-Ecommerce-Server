
import { conn, sql } from '../connect';
let getAll = async() => {
    try {
        let pool = await conn;
        let sqlString = "select * from [dbo].[Category]";
        let categorys = await pool.request().query(sqlString);
        if (categorys)
            return (categorys.recordsets[0])
        else
            return ([])
    }
    catch (e) {
        return (null);
    }
}

let getCategoryByidGuitar = async (idGuitar) => {
    try {
        let categoryData = {};
        let pool = await conn;
        let categorys = await pool.request()
            .input('input_parameter', sql.Int, idGuitar)
            .query("select ca.name from Guitar_Category gca,Category ca where gca.idCategory=ca.id and gca.idGuitar= @input_parameter");

        if (categorys){
            categoryData.categorys=categorys.recordsets[0];
            categoryData.message="ok"
        }
        else{
            categoryData.message="Không tìm thấy id guitar"
        }
        return categoryData;
    }
    catch (e) {
        return (e);
    }

}


let insert = async (Guitar_Category) => {
    //let trans;
    let regisStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('idGuitar', sql.Int, Guitar_Category.idGuitar)
            .input('idCategory', sql.Int, Guitar_Category.idCategory)
            .query("Insert into [dbo].[Guitar_Category] (idGuitar,idCategory) values (@idGuitar,@idCategory)");
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



let deleted = async (Guitar_Category) => {
    //let trans;
    let updateStatus = {};
    try {

        let pool = await conn;
        //trans = (await conn).transaction();
        //trans.begin();
        let result = await pool.request()
            .input('idGuitar', sql.Int, Guitar_Category.idGuitar)
            .input('idCategory', sql.Int, Guitar_Category.idCategory)
            .query("DELETE FROM [dbo].[Guitar_Category]  where idGuitar = @idGuitar and idCategory=@idCategory");
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
    getCategoryByidGuitar: getCategoryByidGuitar,
    insert: insert,
    deleted: deleted
}