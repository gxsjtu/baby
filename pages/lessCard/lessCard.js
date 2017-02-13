Page({
    shCensus: function(e){
        wx.navigateTo({ url: '../lessCardSh/lessCardSh?from=native' });
    },
    otherCensus: function(e){
        wx.navigateTo({ url: '../lessCardSh/lessCardSh?from=other' });
    }
})