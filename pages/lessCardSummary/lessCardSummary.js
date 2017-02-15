Page({
    data: {
        streets: [],
        ishid: false,
        delta: "",
        pageId:""
    },
    onLoad: function (e) {
        let globalData = getApp().globalData;
        this.setData({
            needs:globalData.dataList
        });
        this.data.delta = e.delta;
        var pId = e.pageId;
        this.data.pageId = pId;
        if (e.type == "1") {
            var ss = globalData.resultStreets;
            if (ss == null || ss == undefined || ss.length <= 0) {
                this.setData({
                    ishid: true
                })
            }
            else {
                this.setData({
                    streets: globalData.resultStreets
                })
            }
        } else {
            this.setData({
                ishid: true
            })
        }
    },
    goBack: function () {
        //    wx.navigateTo({ url: '../index/index' });
        if (this.data.delta == "y") {
            wx.navigateBack({ delta: 4 });
        }
        else {
            wx.navigateBack({ delta: 3 });
        }
    }
})