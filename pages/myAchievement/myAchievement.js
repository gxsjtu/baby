Page({
    data: {
        imgHeight: "0px",
        avgHeight: ""
    },
    onLoad: function(e){
        // wx.getSystemInfo({
        //   success: (res) => {
        //     // success
        //     var h = res.windowHeight + "px";
        //     this.setData({
        //         imgHeight: h
        //     })
        //   }
        // })
    },
    getHeight: function(e){
        console.log(e);
        var avgH = e.detail.height/7 + "px";
        this.setData({
            imgHeight: e.detail.height + "px",
            avgHeight: avgH
        })
    }
})