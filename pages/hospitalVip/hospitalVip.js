
Page({
    data: {
        suits:[]
    },
    onLoad: function () {
        var app = getApp();
        console.log(app.globalData.hospital)
        this.setData({
            suits: app.globalData.hospital.suits
        })
    }
})