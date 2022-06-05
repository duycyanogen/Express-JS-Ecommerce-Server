import categoryServices from '../services/categoryServices'
let getAllCategory = async (req, res) => {
    try {
        let categorys = await categoryServices.getAll();
        return res.status(200).json({
            message: "OK",
            data: categorys
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "0",
        })
    }

}
let getCategory = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    if (!idGuitar) {
        return res.status(500).json({
            errCode: 1,
            message: "Không đủ thông tin!"
        })
    }
    let categoryData = await categoryServices.getCategoryByidGuitar(idGuitar);
    return res.status(200).json({
        message: categoryData.message,
        categoryData: categoryData.categorys
    })

}

let insert = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    let idCategory = req.body.idCategory;
    if (!idGuitar || !idCategory ) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let guitarCategory = { ...req.body };
    let data = await categoryServices.insert(guitarCategory);
    return res.status(200).json({
        data
    })

}



let deleted = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    let idCategory = req.body.idCategory;
    if (!idGuitar||!idCategory) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let guitarCategory = { ...req.body };
    let data = await categoryServices.deleted(guitarCategory);
    return res.status(200).json({
        data
    })
}

module.exports = {
    getAllCategory: getAllCategory,
    getCategory: getCategory,
    insert: insert,
    deleted: deleted
}