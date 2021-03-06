const ShareSvc = require('../../services/shareSvc.js');
Page({
    data: {},
    onShareAppMessage: function () {
        var shareSvc = new ShareSvc();
        shareSvc.giveShare();
        return { title: '事妈驾到', path: '/pages/index/index' }
    },
    onLoad: function (e) {
        let globalData = getApp().globalData;
        this.setData({ userInfo: globalData.userInfo });
    },
    gotoInfo: function (e) {
        wx.navigateTo({ url: '../userInfo/userInfo' });
    },
    gotoWait: function (e) {
        console.log(e);
        wx.navigateTo({
            url: '../wait/wait?name=' + e.currentTarget.dataset.menuname
        });
    },
    gotoAchievement: function (e) {
        wx.navigateTo({ url: '../myAchievement/myAchievement' });
    },
    gotoMyOrders: function (e) {
        wx.navigateTo({ url: '../myOrders/myOrders' });
    },
    gotoMyBuyOrders: function(){
        wx.navigateTo({
          url: '../myBuyOrders/myBuyOrders'
        })
    }
})
