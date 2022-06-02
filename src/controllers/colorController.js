import colorServices from '../services/colorServices'
let getAllColor = async (req, res) => {
    try {
        let categorys = await colorServices.getAll();
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
let getColor = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    if (!idGuitar) {
        return res.status(500).json({
            errCode: 1,
            message: "Không đủ thông tin!"
        })
    }
    let colorData = await colorServices.getColorByidGuitar(idGuitar);
    return res.status(200).json({
        message: colorData.message,
        colorData: colorData.colors
    })

}

let insert = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    let idColor = req.body.idColor;
    if (!idGuitar || !idColor ) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let guitarColor = { ...req.body };
    let data = await colorServices.insert(guitarColor);
    return res.status(200).json({
        data
    })

}



let deleted = async (req, res) => {
    let idGuitar = req.body.idGuitar;
    let idColor = req.body.idColor;
    if (!idGuitar||!idColor) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let guitarColor = { ...req.body };
    let data = await colorServices.deleted(guitarColor);
    return res.status(200).json({
        data
    })
}

module.exports = {
    getAllColor: getAllColor,
    getColor: getColor,
    insert: insert,
    deleted: deleted
}