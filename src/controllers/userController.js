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
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let userData = await userServices.handleUserLogin(email, password);
    if (userData.errCode != 0) {
        return res.status(500).json({
            ...userData
        })
    }
    else {
        return res.status(200).json({
            ...userData
        })
    }


}

let handleRegis = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;
    let phone = req.body.phone;
    let name = req.body.name;
    if (!email || !password || !address || !phone || !name) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let user = { ...req.body };
    user.created = new Date();
    user.isDeleted = 0;
    user.idRole = 3;
    let userData = await userServices.insert(user);
    if (userData.errCode != 0) {
        return res.status(500).json({
            ...userData
        })
    }
    else {
        return res.status(200).json({
            ...userData
        })
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
    let user = { ...req.body };
    user.updated = new Date();
    let userData = await userServices.update(user);
    console.log("User", userData);
    return res.status(200).json({
        ...userData
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
    let user = { ...req.body };
    let userData = await userServices.deleted(user);
    console.log("User", userData);
    return res.status(200).json({
        ...userData
    })
}

module.exports = {
    getAllUser: getAllUser,
    handleLogin: handleLogin,
    handleRegis: handleRegis,
    update: update,
    deleted: deleted
}