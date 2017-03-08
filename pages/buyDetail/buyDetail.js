Page({
    data: {
        outWidth: ""
    },
    onLoad: function (e) {
        wx.getSystemInfo({
            success: (res) => {
                // success
                var w = parseInt(res.windowWidth / 4) - 10;
                var h = res.windowHeight - 51;
                var buyW = parseInt(res.windowWidth - (w * 3));
                this.setData({
                    outWidth: res.windowWidth + "px",
                    scrollHeight: h + "px",
                    bottomWidth: w + "px",
                    buyWidth: buyW + "px"
                })
            }
        })
    }
})