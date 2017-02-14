Page({
    data: {
        fromStr:""
    },
    onLoad: function (param) {
        this.getPageData(param.from);
        this.data.fromStr = param.fromStr;
    },
    getPageData: function (option) {
        if (option == 'native') {
            this.setData({
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
                ],
                header: '上海本市户籍小卡办理攻略',
                address: '孕妈户籍所在地社区医院',
                option: 1,
                notes: ['双方身份证、双方户口本、双方结婚证、早期检查单（医院开具或现场检查）',
                    '通常办事机构会留存复印件，请提前自备，以节省办事时间']
            });
        }
        else if (option == 'other') {
            this.setData({
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
                    }, {
                        name: '居住证',
                        src: '../../assets/images/credential5.jpg'
                    },
                    {
                        name: '医保卡',
                        src: '../../assets/images/babyCensus2.jpg'
                    },
                    {
                        name: '联系卡',
                        src: '../../assets/images/credential4.jpg'
                    }
                ],
                header: '外省市户籍小卡办理攻略',
                address: '孕妈居住所在地社区医院',
                option: 2,
                notes: ['双方身份证、双方户口本、双方结婚证、早期检查单（医院开具或现场检查）、居住证及复印件（正反面）或租房合同',
                    '通常办事机构会留存复印件，请提前自备，以节省办事时间',
                    '部分社区医院可能需要：医保卡、居委会开的孕情单']
            });
        }
    },
    gotoOption: function (e) {
        wx.navigateTo({ url: '../lessCardOptions/lessCardOptions?type=' + this.data.option + '&fromStr=' + this.data.fromStr }); //上海
    },
    gotoSummary: function (e) {
        wx.navigateTo({ url: '../lessCardSummary/lessCardSummary?type=' + this.data.option + '&delta=n&fromStr=' + this.data.fromStr}); //外省
    }
})
