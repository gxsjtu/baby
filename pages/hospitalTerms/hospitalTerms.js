Page({
    data: {
        terms: []
    },
    onLoad: function () {
        var app = getApp();
        this.setData({
            terms: app.globalData.hospital.terms
        })
    }
})