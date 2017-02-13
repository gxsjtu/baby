Page({
    data: {
        credentials1: [
            { name: '准生证', src: '../../assets/images/credential4.jpg' },
            { name: '流动人口婚育证明', src: '../../assets/images/credential5.jpg' }
        ],
        credentials2:[
            {name:'身份证',src:'../../assets/images/credential1.jpg'},
            {name:'户口本',src:'../../assets/images/credential2.jpg'},
            {name:'结婚证',src:'../../assets/images/credential3.jpg'},
            {name:'准生证',src:'../../assets/images/credential4.jpg'},
            {name:'流动人口生育证明',src:'../../assets/images/credential5.jpg'},
            {name:'联系卡',src:'../../assets/images/credential6.jpg'}
        ]
    },
    gotoOption: function(e){
        wx.navigateTo({ url: '../lessCardOptions/lessCardOptions?from=other' });
    },
    gotoSummary: function(e){
        wx.navigateTo({ url: '../lessCardSummary/lessCardSummary?from=other' });
    }
})