
Page({
    data: {
        suits:[]
    },
    onLoad: function () {
        var app = getApp();
        this.setData({
            suits: app.globalData.hospital.suits
        })
    }
})