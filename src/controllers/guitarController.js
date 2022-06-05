import guitarServices from '../services/guitarServices';
//var guitarServices = require('../services/guitarServices');
let getAllGuitar = async (req, res) => {
    try {
        let guitars = await guitarServices.getAll();
        return res.status(200).json({
            message: "OK",
            data: guitars
        })
    }
    catch (e) {
        return res.status(500).json({
            message: e,
        })
    }

}
let insert = async (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let contents = req.body.contents;
    let discount  = req.body.discount;
    let views  = req.body.views;
    if (!name || !price || !contents || (!discount&&!discount==0)||(!views&&!views==0)) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let guitar = { ...req.body };
    guitar.created = new Date();
    guitar.isDeleted = 0;
    let guitarData = await guitarServices.insert(guitar);
    return res.status(200).json({
        guitarData
    })

}

let update = async (req, res) => {

    let id = req.body.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập id!"
        })
    }
    let guitar = { ...req.body };
    guitar.updated = new Date();
    let guitarData = await guitarServices.update(guitar);
    console.log("guitar", guitarData);
    return res.status(200).json({
        guitarData
    })

}

let deleted = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập id!"
        })
    }
    let guitar = { ...req.body };
    let guitarData = await guitarServices.deleted(guitar);
    console.log("guitar", guitarData);
    return res.status(200).json({
        guitarData
    })
}

module.exports = {
    getAllGuitar: getAllGuitar,
    insert: insert,
    update: update,
    deleted: deleted
}