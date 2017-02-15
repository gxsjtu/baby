Page({
    data: {
        
    },
    onLoad: function (e) {
        let globalData = getApp().globalData;
        this.setData({ userInfo: globalData.userInfo });
    },
    gotoInfo:function(e){
        wx.navigateTo({ url: '../userInfo/userInfo' });
    },
    gotoWait:function(e){
        console.log(e);
        wx.navigateTo({ url: '../wait/wait?name='+e.currentTarget.dataset.menuname });
    }
})