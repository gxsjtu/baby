Page({
    data:{
        credentials:[
            {name:'身份证',src:'../../assets/images/credential1.jpg'},
            {name:'户口本',src:'../../assets/images/credential2.jpg'},
            {name:'结婚证',src:'../../assets/images/credential3.jpg'}
        ]
    },
    gotoOption: function(){
        wx.navigateTo({ url: '../lessCardOptions/lessCardOptions' });
    }
})