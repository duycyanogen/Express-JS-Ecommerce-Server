import shopCartServices from '../services/shopCartServices';
let getAllShopCart = async (req, res) => {
    try {
        let orders = await shopCartServices.getAll();
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
let getShopCartByUserID = async (req, res) => {
    let userID = req.body.userID;
    if (!userID) {
        return res.status(500).json({
            errCode: 1,
            message: "Không đủ thông tin!"
        })
    }
    let cartsData = await shopCartServices.getShopCartByUserID(userID);
    return res.status(200).json({
        message: cartsData.message,
        cartsData: cartsData.shopCarts
    })

}

let insert = async (req, res) => {
    let userID = req.body.userID;
    let idGuitar = req.body.idGuitar;
    let quantity = req.body.quantity;
    let amount = req.body.amount;
    if (!userID || !idGuitar || !quantity || !amount) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let cart = { ...req.body };
    cart.created = new Date();
    cart.isOrdered = 0;
    let cartData = await shopCartServices.insert(cart);
    return res.status(200).json({
        cartData
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
    let cart = { ...req.body };
    cart.updated = new Date();
    let cartData = await shopCartServices.update(cart);
    console.log("cart", cartData);
    return res.status(200).json({
        cartData
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
    let cart = { ...req.body };
    let cartData = await shopCartServices.deleted(cart);
    console.log("cart", cartData);
    return res.status(200).json({
        cartData
    })
}

module.exports = {
    getAllShopCart: getAllShopCart,
    getShopCartByUserID:getShopCartByUserID,
    insert: insert,
    update: update,
    deleted: deleted
}