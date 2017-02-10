Page({
    data:{
        credentials:[
            {name:'准生证',src:'../../assets/images/credential1.jpg'},
            {name:'流动人口婚育证明',src:'../../assets/images/credential2.jpg'}
        ]
    },
    next: function(e){
        wx.navigateTo({ url: '../lessCardOtherStep2/lessCardOtherStep2' });
    }
})