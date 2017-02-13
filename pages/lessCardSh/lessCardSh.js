Page({
    data: {
        credentials: [
            {
                name: '身份证',
                src: '../../assets/images/credential1.jpg'
            }, {
                name: '户口本',
                src: '../../assets/images/babyCensus1.jpg'
            }, {
                name: '结婚证',
                src: '../../assets/images/credential3.jpg'
            }, {
                name: '早期检查单（医院开具或现场检查）',
                src: '../../assets/images/credential2.jpg'
            }
        ]
    },
    gotoOption: function(e) {
        wx.navigateTo({url: '../lessCardOptions/lessCardOptions?type=1'}); //上海
    },
    gotoSummary: function(e) {
        wx.navigateTo({url: '../lessCardSummary/lessCardSummary?type=2'}); //外省
    }
})
