const GLOBAL = require('../../global.js');

Page({
    data:{
        imgAddress:"",
        imgWidth:"",
        imgHeight:""
    },
    onLoad: function(e) {
        var bId = e.id;
        let gift = getApp().globalData.currentGift;
        wx.setNavigationBarTitle({ title: gift.name });
        this.setData({
            imgAddress:GLOBAL.SERVER + "/images/bundles/" + bId + "/" + gift.name + "/purchase"
        })
    },
    getSize: function(e){
        wx.getSystemInfo({
          success: (res) => {
            // success
            var w = res.windowWidth + "px";
            var h = e.detail.height + "px";
            this.setData({
                imgWidth: w,
                imgHeight: h
            })
          }
        })
    }
})