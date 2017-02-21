Page({
    data: {
        imgHeight: ""
    },
    onLoad: function(e){
        wx.getSystemInfo({
          success: (res) => {
            // success
            var h = res.windowHeight + "px";
            this.setData({
                imgHeight: h
            })
          }
        })
    }
})