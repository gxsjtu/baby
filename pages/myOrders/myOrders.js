const OrderSvc = require("../../services/orderSvc.js");
const GLOBAL = require('../../global.js');

Page({
    data: {
        orderList: [],
        imgAddress: GLOBAL.SERVER + "/images/",
        isNoRecord: false,
        scrollHeight:""
    },
    onLoad: function () {
        wx.getSystemInfo({
          success: (res) => {
            // success
            this.setData({
                scrollHeight:res.windowHeight + "px"
            })
          }
        })
        var orderSvc = new OrderSvc();
        orderSvc.getOrders().then(data => {
            var dataList = data.data.data;
            console.log(dataList);
            if (dataList == null || dataList == undefined || dataList.length <= 0) {
                this.setData({ isNoRecord: true});
            }
            else {
                var newOrderList = [];
                for (var i = 0; i < dataList.length; i++) {
                    var imgUrlList = [];
                    var order = { id: dataList[i]._id, date: dataList[i].date, name: dataList[i].name, items: dataList[i].items, result: dataList[i].result };
                    var itemsName = "";
                    for (var j = 0; j < dataList[i].items.length; j++) {
                        if (j == 0) {
                            itemsName += dataList[i].items[j].name;
                        } else {
                            itemsName += "、" + dataList[i].items[j].name;
                        }

                        var url = this.data.imgAddress + "bundles/" + order.id + "/" + dataList[i].items[j].name + "/" + dataList[i].items[j].name;
                        imgUrlList.push(encodeURI(url));
                        // imgUrlList.push(url);
                    }
                    order.itemsName = itemsName;
                    order.imgUrlList = imgUrlList;
                    newOrderList.push(order);
                }
                this.setData({
                    orderList: newOrderList,
                    isNoRecord: false
                })
            }
        })
    }

})