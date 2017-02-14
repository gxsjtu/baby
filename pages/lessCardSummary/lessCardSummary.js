Page({
    data: {
        streets: [],
        ishid: false,
        delta: ""
    },
    onLoad: function (e) {
        this.data.delta = e.delta;
        if (e.type == "1") {
            var ss = getApp().globalData.resultStreets;
            if (ss == null || ss == undefined || ss.length <= 0) {
                this.setData({
                    ishid: true
                })
            }
            else {
                this.setData({
                    streets: getApp().globalData.resultStreets
                })
            }
        } else {
            this.setData({
                ishid: true
            })
        }
    },
    goBack: function () {
        console.log('aa');
        //    wx.navigateTo({ url: '../index/index' });
        if (this.data.delta == "y") {
            wx.navigateBack({ delta: 4 });
        }
        else {
            wx.navigateBack({ delta: 3 });
        }
    }
})