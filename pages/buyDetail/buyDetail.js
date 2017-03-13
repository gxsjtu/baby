const GLOBAL = require('../../global.js');
const BuySvc = require('../../services/buySvc.js');

Page({
    data: {
        imgAddress: GLOBAL.SERVER + "/images/items/",
        outWidth: "",
        buyItem: {},
        slides: [],
        imgHeight: "",
        scrollHeight: "",
        saleQty: 0
    },
    onLoad: function (e) {
        if (getApp().globalData.selectedBuy) {
            var item = getApp().globalData.selectedBuy;
            this.setData({
                buyItem: item
            })
            var buySvc = new BuySvc();
            buySvc.getSaleQtyById(item._id).then(data => {
                this.setData({
                    saleQty: data.data.data
                })
            })
        }
        wx.getSystemInfo({
            success: (res) => {
                // success
                var w = parseInt(res.windowWidth / 4) - 10;
                var h = res.windowHeight - 51;
                var buyW = parseInt(res.windowWidth - (w * 3));
                this.setData({
                    outWidth: res.windowWidth + "px",
                    scrollHeight: h + "px",
                    bottomWidth: w + "px",
                    buyWidth: buyW + "px"
                })
            }
        })
    },
    goEvaluate: function (e) {
        wx.navigateTo({
            url: '../itemEvaluate/itemEvaluate?pageName=buy&canGetBundle=false'
        })
    },
    imgLoaded: function (e) {
        this.setData({
            imgHeight: e.detail.height + "px"
        })
    },
    buyGift: function (e) {
        wx.navigateTo({
            url: '../buyGift/buyGift?pageName=buy'
        })
    }
})
