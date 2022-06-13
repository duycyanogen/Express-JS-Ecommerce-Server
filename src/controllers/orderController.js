import orderServices from '../services/orderService';
let getAllOrder = async (req, res) => {
    try {
        let orders = await orderServices.getAll();
        return res.status(200).json({
            message: "OK",
            data: orders
        })
    }
    catch (e) {
        return res.status(500).json({
            message: e,
        })
    }

}

let getOrderByUserID = async (req, res) => {
    let userID = req.body.userID;
    if (!userID) {
        return res.status(500).json({
            errCode: 1,
            message: "Không đủ thông tin!"
        })
    }
    let orderData = await orderServices.getOrderByUserID(userID);
    return res.status(200).json({
        message: orderData.message,
        orderData: orderData.orders
    })

}

let insert = async (req, res) => {
    let transactionID = req.body.transactionID;
    let idGuitar = req.body.idGuitar;
    let quantity = req.body.quantity;
    let amount = req.body.amount;
    let status = req.body.status;
    if (!transactionID || !idGuitar || !quantity || !amount||(!status&&!status==0)) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let order = { ...req.body };
    order.created = new Date();
    order.isCanceled = 0;
    let orderData = await orderServices.insert(order);
    return res.status(200).json({
        orderData
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
    let order = { ...req.body };
    order.updated = new Date();
    let orderData = await orderServices.update(order);
    console.log("order", orderData);
    return res.status(200).json({
        orderData
    })

}
let cancelByID = async (req, res) => {

    let id = req.body.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập id!"
        })
    }
    let orderData = await orderServices.cancelByID(id);
    return res.status(200).json({
        orderData
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
    let order = { ...req.body };
    let orderData = await orderServices.deleted(order);
    console.log("order", orderData);
    return res.status(200).json({
        orderData
    })
}

module.exports = {
    getAllOrder: getAllOrder,
    getOrderByUserID:getOrderByUserID,
    insert: insert,
    update: update,
    cancelByID:cancelByID,
    deleted: deleted
}