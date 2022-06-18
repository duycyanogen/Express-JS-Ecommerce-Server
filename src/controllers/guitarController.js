import guitarServices from '../services/guitarServices';
import path from 'path';
import sharp from 'sharp';
//var guitarServices = require('../services/guitarServices');
let getAllGuitar = async (req, res) => {
    try {
        let guitars = await guitarServices.getAll();
        guitars = guitars.map((guitar) => {
            return {
                ...guitar,
                imageURL: `http://localhost:8889/api/v1/image1?imageName=${guitar.image?.split('.')[0]}_600x600.jpg`
            }
        })
        return res.status(200).json({
            message: "OK",
            data: guitars
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e,
        })
    }

}
let insert = async (req, res) => {
    try {
        const uploadFolder = path.join(__dirname, "..", "uploads");
        let imageName = `${uploadFolder}\\${req.file.filename}`;
        sharp(imageName).resize(600, 600).toFile(imageName.split('.')[0] + "_600x600." + imageName.split('.')[1], function (err) {
            if (err) {
                res.json({
                    result: "failed",
                    message: `Upload thất bại! ${err}`
                })
            }
        })
        // res.status(200).json({
        //     result: "ok",
        //     message: `Thêm mới sản phẩm thành công!`
        // })
        let name = req.body.name;
        let price = req.body.price;
        let contents = req.body.contents;
        let discount = req.body.discount;
        let views = req.body.views;
        if (!name || !price || !contents || (!discount && !discount == 0) || (!views && !views == 0)) {
            return res.status(500).json({
                errCode: 1,
                message: "Vui lòng nhập đủ thông tin!"
            })
        }
        req.body.fileName = req.file.filename;
        let guitar = { ...req.body };
        guitar.created = new Date();
        guitar.isDeleted = 0;
        let guitarData = await guitarServices.insert(guitar);
        return res.status(200).json({
            guitarData
        })
    } catch (error) {
        console.log(error);
    }


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