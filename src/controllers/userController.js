import userServices from '../services/userService';
//var guitarServices = require('../services/guitarServices');
let getAllUser = async (req, res) => {
    try {
        let users = await userServices.getAll();
        return res.status(200).json({
            message: "OK",
            data: users
        })
    }
    catch (e) {
        return res.status(500).json({
            message: e,
        })
    }

}

module.exports = {
    getAllUser: getAllUser,
}