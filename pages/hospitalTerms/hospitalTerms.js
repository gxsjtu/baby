Page({
    data: {
        terms: {}
    },
    onLoad: function () {
        console.log("eee");
        var app = getApp();
        this.setData({
            terms: app.globalData.hospital.terms
        })
    }
})