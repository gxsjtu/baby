Page({
    data:{
        scrollHeight:'',
        showMask:false
    },
    onLoad:function(e){
        wx.getSystemInfo({
            success: (res) => {
                var h = res.windowHeight - 52;
                this.setData({
                    scrollHeight: h + "px",
                })
            }
        })
    }
})