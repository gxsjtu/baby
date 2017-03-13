const OrderSvc = require("../../services/myBuyOrderSvc.js");
const GLOBAL = require('../../global.js');

Page({
    data: {
        orderList: [],
        imgAddress: GLOBAL.SERVER + "/images/items/"
    },
    onLoad: function (e) {
        var orderSvc = new OrderSvc();
        orderSvc.getMyOrders().then(data => {
            this.setData({
                orderList: data.data.data
            })
        })
    }
})