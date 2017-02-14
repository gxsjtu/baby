Page({
    data: {
        
    },
    onLoad: function (e) {
        let globalData = getApp().globalData;
        this.setData({ userInfo: globalData.userInfo });
    },
    gotoInfo:function(e){
        wx.navigateTo({ url: '../userInfo/userInfo' });
    }
})