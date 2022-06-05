import transactionServices from '../services/transactionServices';
let getAllTransaction = async (req, res) => {
    try {
        let orders = await transactionServices.getAll();
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
let getTransactionByUserID = async (req, res) => {
    let userID = req.body.userID;
    if (!userID) {
        return res.status(500).json({
            errCode: 1,
            message: "Không đủ thông tin!"
        })
    }
    let transactionsData = await transactionServices.getTransactionByUserID(userID);
    return res.status(200).json({
        message: transactionsData.message,
        transactionsData: transactionsData.transactions
    })

}

let insert = async (req, res) => {
    let userID = req.body.userID;
    let customerName = req.body.customerName;
    let customerEmail = req.body.customerEmail;
    let customerPhone = req.body.customerPhone;
    let customerAddress = req.body.customerAddress;
    let amount = req.body.amount;
    let message = req.body.message;
    let status = req.body.status;
    let note = req.body.note;
    if (!userID || !customerName || !customerEmail || !customerPhone|| !amount||!customerAddress|| (!status&&!status==0)) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đủ thông tin!"
        })
    }
    let transaction = { ...req.body };
    transaction.created = new Date();
    transaction.isCanceled = 0;
    let transactionData = await transactionServices.insert(transaction);
    return res.status(200).json({
        transactionData
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
    let transaction = { ...req.body };
    transaction.updated = new Date();
    let transactionData = await transactionServices.update(transaction);
    console.log("transaction", transactionData);
    return res.status(200).json({
        transactionData
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
    let transaction = { ...req.body };
    let transactionData = await transactionServices.deleted(transaction);
    console.log("transaction", transactionData);
    return res.status(200).json({
        transactionData
    })
}

module.exports = {
    getAllTransaction: getAllTransaction,
    getTransactionByUserID:getTransactionByUserID,
    insert: insert,
    update: update,
    deleted: deleted
}