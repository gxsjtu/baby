Page({
    gotoOption: function(e){
        wx.navigateTo({ url: '../lessCardOptions/lessCardOptions' });
    },
    gotoSummary: function(e){
        wx.navigateTo({ url: '../lessCardSummary/lessCardSummary' });
    }
})