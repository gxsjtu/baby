Page({
    data: {
        fromStr: ""
    },
    onLoad: function (e) {
        this.data.fromStr = e.fromStr
    },
    shCensus: function (e) {
        wx.navigateTo({ url: '../lessCardSh/lessCardSh?from=native&fromStr=' + this.data.fromStr });
    },
    otherCensus: function (e) {
        wx.navigateTo({ url: '../lessCardSh/lessCardSh?from=other&fromStr=' + + this.data.fromStr });
    }
})