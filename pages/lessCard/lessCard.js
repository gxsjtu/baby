Page({
    data: {
        fromStr: "",
        page: ''
    },
    onLoad: function (e) {
        this.data.fromStr = e.fromStr;
        this.setPageData(e.page);
    },
    shCensus: function (e) {
        wx.navigateTo({ url: '../lessCardSh/lessCardSh?from=native&page=' + this.data.page + '&fromStr=' + this.data.fromStr });
    },
    otherCensus: function (e) {
        wx.navigateTo({ url: '../lessCardSh/lessCardSh?from=other&page=' + this.data.page + '&fromStr=' + this.data.fromStr });
    },
    setPageData: function (param) {
        if (param == 'lessCard') {
            wx.setNavigationBarTitle({
                title: '办理小卡攻略'
            });
            this.setData({
                title: '上海市孕产妇健康手册',
                content: '简称(小卡)，是由上海妇女保健所发放的，记录孕产妇健康情况的手册，是孕妇生产的重要证件之一，医院建立打卡时会要求出示。',
                image: {
                    src: '../../assets/images/lessCardContent.jpg',
                    width: 520,
                    height: 300
                },
                option: '建卡',
                page: 'lessCard'
            });
        }
        else if (param == 'birth') {
            wx.setNavigationBarTitle({
                title: '申报生育保险攻略'
            })
            this.setData({
                title: '申报生育保险攻略',
                content: '生育保险是国家通过立法，在怀孕和分娩的妇女劳动者暂时中断劳动时，由国家和社会提供医疗服务、生育津贴和产假的一种社会保险制度，国家或社会对生育的职工给予必要的经济补偿和医疗保健的社会保险制度。',
                image: {
                    src: '../../assets/images/babyCensus4.jpg',
                    width: 680,
                    height: 452
                },
                option: '申报生育保险',
                page: 'birth'
            });
        }
    }

})