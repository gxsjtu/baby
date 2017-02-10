Page({
    data:{
        credentials:[
            {name:'准生证',src:'../../assets/images/credential4.jpg'},
            {name:'流动人口婚育证明',src:'../../assets/images/credential5.jpg'}
        ]
    },
    next: function(e){
        wx.navigateTo({ url: '../lessCardOtherStep2/lessCardOtherStep2' });
    }
})