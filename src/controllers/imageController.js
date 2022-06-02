import imageServices from '../services/imageServices'
let getAllImage = async (req, res) => {
    try {
        let Images = await imageServices.getAll();
        return res.status(200).json({
            message: "OK",
            data: Images
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "0",
        })
    }

}
let getImage = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    if (!idGuitar) {
        return res.status(500).json({
            errCode: 1,
            message: "Không đủ thông tin!"
        })
    }
    let imageData = await imageServices.getImageByidGuitar(idGuitar);
    return res.status(200).json({
        message: imageData.message,
        imageData: imageData.images
    })

}

let insert = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    let image = req.body.image;
    let imgDetail = req.body.imgDetail;
    if (!idGuitar || !image ) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let imageData = { ...req.body };
    imageData.isDeleted = 0;
    let data = await imageServices.insert(imageData);
    return res.status(200).json({
        data
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
    let image = { ...req.body };
    let imageData = await imageServices.update(image);
    console.log("image", imageData);
    return res.status(200).json({
        imageData
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
    let image = { ...req.body };
    let imageData = await imageServices.deleted(image);
    console.log("image", imageData);
    return res.status(200).json({
        imageData
    })
}


module.exports = {
    getAllImage: getAllImage,
    getImage: getImage,
    insert: insert,
    update:update,
    deleted: deleted
}