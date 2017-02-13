Page({
    data: {
        streets: [],
        ishid: false
    },
    onLoad: function (e) {
        // console.log(getApp().globalData.resultStreets);
        if (e.type == "1") {
            this.setData({
                streets: getApp().globalData.resultStreets
            })
        } else {
            this.setData({
                ishid: true
            })
        }
    }
})