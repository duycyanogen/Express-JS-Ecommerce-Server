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

module.exports = {
    getAllGuitar: getAllGuitar,
}