const OrderSvc = require("../../services/myBuyOrderSvc.js");
const PaymentSvc = require('../../services/paymentSvc.js');
const BuySvc = require('../../services/buySvc.js');
const GLOBAL = require('../../global.js');
var _ = require('../../utils/lodash.min.js');


Page({
    data: {
        orderList: [],
        imgAddress: GLOBAL.SERVER + "/images/items/",
        scrollHeight: ""
    },
    onLoad: function (e) {
        wx.getSystemInfo({
            success: (res) => {
                // success
                this.setData({
                    scrollHeight: res.windowHeight + "px"
                })
            }
        })
        var orderSvc = new OrderSvc();
        orderSvc.getMyOrders().then(data => {
            this.setData({
                orderList: data.data.data
            })
        })
    },
    gotoPay: function (e) {
        var itemId = e.currentTarget.dataset.itemId;
        var paymentSvc = new PaymentSvc();
        paymentSvc.paymentByOrderId(itemId).then(data => {
            if (data.data.message == "OK") {
                var buySvc = new BuySvc();
                buySvc.payment(data.data.data).then(data => {
                    var orderSvc = new OrderSvc();
                    orderSvc.getMyOrders().then(data => {
                        this.setData({
                            orderList: data.data.data
                        })
                    })
                });
            }
        })
    }
})