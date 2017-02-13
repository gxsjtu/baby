Page({
    data: {

    },
    onLoad: function (param) {
        this.getPageData(param.from);
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
                need: '双方身份证、双方户口本、双方结婚证、早期检查单（医院开具或现场检查）',
                address: '孕妈户籍所在地社区医院',
                option: 1
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
                    }
                ],
                header: '外省市户籍小卡办理攻略',
                need: '双方身份证、双方户口本、双方结婚证、早期检查单（医院开具或现场检查）、居住证及复印件（正反面）或租房合同',
                address: '孕妈居住所在地社区医院',
                option: 2
            });
        }
    },
    gotoOption: function (e) {
        wx.navigateTo({ url: '../lessCardOptions/lessCardOptions?type=' + this.data.option }); //上海
    },
    gotoSummary: function (e) {
        wx.navigateTo({ url: '../lessCardSummary/lessCardSummary?type=' + this.data.option }); //外省
    }
})
