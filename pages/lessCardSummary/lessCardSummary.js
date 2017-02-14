Page({
    data: {
        streets: [],
        ishid: false
    },
    onLoad: function (e) {

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
    }
})