//index.js
Page({
    data: {
        firstItemSelected: true, //现在的页面是产前阶段还是产后阶段，产前为true
        //产前阶段数据
        beforeListData: [
            {
                id: 1,
                title: '确认怀孕计算预产期',
                date: '(孕6-8周)'
            }, {
                id: 2,
                title: '选择／查看生产医院',
                date: '(孕8-9周)'
            }, {
                id: 3,
                title: '社区医院建小卡',
                date: '(孕9-12周)'
            }, {
                id: 4,
                title: '医院建大卡产检',
                date: '(孕11-13周)'
            }, {
                id: 5,
                title: '关键产检：唐氏筛查',
                date: '(孕11-13周)'
            }, {
                id: 6,
                title: '关键产检：大排畸',
                date: '(孕20-22周)'
            }, {
                id: 7,
                title: '关键产检：糖耐量',
                date: '(孕22-24周)'
            }, {
                id: 8,
                title: '选择月子中心',
                date: '(孕25-26周)'
            }, {
                id: 9,
                title: '关键产检：胎心监护',
                date: '(孕32-36周)'
            }, {
                id: 10,
                title: '购买准备待产包',
                date: '(孕35-36周)'
            }, {
                id: 11,
                title: '入院前准备',
                date: '(孕36-37周)'
            }, {
                id: 12,
                title: '生产攻略',
                date: '(孕37-39周)'
            }
        ],
        //产后阶段数据
        afterListData: [
            {
                id: 21,
                title: '办理《出生医学证明》',
                date: '(出生7天内)'
            }, {
                id: 22,
                title: '产后42天检查',
                date: '(出生6周)'
            }, {
                id: 23,
                title: '申报宝宝户口',
                date: '(宝宝出生后)'
            }, {
                id: 24,
                title: '办理宝宝医疗保险',
                date: '(宝宝出生后)'
            }, {
                id: 25,
                title: '办理少儿互助基金',
                date: '(宝宝出生后)'
            }, {
                id: 26,
                title: '申请生育保险',
                date: '(宝宝出生后)'
            }
        ],
        hideMask: true,
        alertText: ''
    },
    onLoad: function () {
        this.beforeChildbirth();

    },
    //点击产前阶段
    beforeChildbirth: function () {
        this.setData({ firstItemSelected: true })
    },
    //点击产后阶段
    afterChildbirth: function () {
        this.setData({ firstItemSelected: false })
    },
    goto: function (event) {
        let app = getApp().globalData;
        switch (event.target.dataset.item.id) {
            case 1:
                wx.navigateTo({ url: '../confinementDate/confinementDate' });
                break;
            case 2:
                wx.navigateTo({ url: '../hospitalList/hospitalList' });
                break;
            case 3:
                wx.navigateTo({ url: '../lessCard/lessCard?fromStr=1' });//1代表社区医院
                break;
            case 4:
                //医院建大卡产检,需要判断是否选择了默认医院。

                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalCard/hospitalCard?do=cards' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 5:
                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalCard/hospitalCard?do=downs' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 6:
                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalCard/hospitalCard?do=inspections' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 7:
                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalCard/hospitalCard?do=ogtts' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 8:
                wx.navigateTo({ url: '../matronCenter/matron' });
                break;
            case 9:
                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalCard/hospitalCard?do=fhrms' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 10:
                //待产包
                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalPackages/hospitalPackages?from=package' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 11:
                //入院前准备
                if (app.defaultHos) {
                    getApp().globalData.hospital = app.defaultHos;
                    wx.navigateTo({ url: '../hospitalPackages/hospitalPackages?from=ready' });
                }
                else {
                    this.showAlert('您没有选择生产医院，请先选择一个生产医院');
                }
                break;
            case 12:
                //生产攻略
                wx.navigateTo({ url: '../laborPrepare/laborPrepare' });
                break;
            case 23:
                wx.navigateTo({ url: '../babyCensus/babyCensus?do=census&fromStr=2&type=1' });
                break;
            case 24:
                wx.navigateTo({ url: '../babyCensus/babyCensus?do=medical&fromStr=3&type=1' });
                break;
            case 25:
                wx.navigateTo({ url: '../babyCensus/babyCensus?do=fund&fromStr=1&type=1' });
                break;
            case 26:
                wx.navigateTo({ url: '../babyCensus/babyCensus?do=birth&fromStr=3' });
                break;
            default:
                break;
        }
    },
    hide: function (event) {
        this.setData({
            hideMask: true
        })
    },
    fullClick: function (event) {
        //勿删
    },
    showAlert: function (msg) {
        this.setData({
            hideMask: false,
            alertText: msg
        })
    },
    gotoSelect: function (event) {
        this.setData({
            hideMask: true,
            alertText: ''
        })
        wx.navigateTo({ url: '../hospitalList/hospitalList' });
    }
})
