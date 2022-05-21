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

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        userData: userData
    })

}

module.exports = {
    getAllUser: getAllUser,
    handleLogin: handleLogin,
}