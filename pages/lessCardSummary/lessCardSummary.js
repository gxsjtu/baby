const optIn = require("../../utils/optIn.js");
var _ = require('../../utils/lodash.min.js');
const ActionSvc = require("../../services/actionSvc.js");
var optInSvc = require('../../utils/optIn.js');

Page({
    data: {
        streets: [],
        ishid: false,
        delta: "",
        pageId: "",
        bsHidden: true,
        jcHidden: true,
        yyHidden: true,
        optIn: {
            num: 0,
            enable: [true, true, true],
            showError: false
        },
        isXZHid: true,
        pageName: '',
        animationData: {},
        xzType: "",
        showMask: false,
        modalBottom: "",
        scrollHeight: ""
    },
    onLoad: function (e) {
        wx.getSystemInfo({
            success: (res) => {
                var h = (res.windowHeight / 2 - 150) + "px";
                var s = (res.windowHeight - 246) + "px";
                this.setData({
                    modalBottom: h,
                    scrollHeight: s
                })
            }
        })
        this.data.pageName = e.pageName;
        optInSvc.setOptInData(this);
        var actionSvc = new ActionSvc()
        actionSvc.getModalByPageName(this.data.pageName).then(data => {
            this.setData({ xzType: data });
        })

        let globalData = getApp().globalData;

        this.data.delta = e.delta;
        var pId = e.pageId;
        this.data.pageId = pId;
        var fromStr = e.fromStr;

        if (pId == '26') {
            this.setData({ title: '申请生育保险小结', needs: globalData.dataList });
        } else if (pId == '3') {
            if (e.type == "1") {
                this.setData({
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证', '早期检查单（医院开具或现场检查）']
                });
            } else {
                this.setData({
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证', '早期检查单（医院开具或现场检查）', '居住证及复印件(正反面)或租房合同']
                });
            }

        } else {
            if (pId == "23") {
                this.setData({ title: '申报宝宝户口', needs: globalData.dataList });
            } else if (pId == "24") {
                this.setData({ title: '办理宝宝医疗保险', needs: globalData.dataList });
            } else if (pId == "25") {
                this.setData({ title: '办理少儿互助基金', needs: globalData.dataList });
            }
        }

        var ss = globalData.resultStreets;
        if (ss == null || ss == undefined || ss.length <= 0) {
            this.setData({ ishid: true, jcHidden: true, bsHidden: true, yyHidden: true })
        } else {
            if (fromStr == "1") {
                this.setData({ jcHidden: true, bsHidden: true, yyHidden: false })
            } else if (fromStr == "2") {
                this.setData({ jcHidden: false, bsHidden: true, yyHidden: true })
            } else if (fromStr == "3") {
                this.setData({ jcHidden: true, bsHidden: false, yyHidden: true })
            }
            this.setData({ streets: globalData.resultStreets })
        }
    },
    goBack: function () {
        if (this.data.delta == "y") {
            wx.navigateBack({ delta: 4 });
        } else {
            wx.navigateBack({ delta: 3 });
        }
    },

    usefulClick: function (e) {
        //点赞
        var actionSvc = new ActionSvc();
        var app = getApp();
        console.log(app);
        // actionSvc.clickGood().then(()=>{

        // });
    },
    medalClick: function (e) {
        optInSvc.medalClick(this);
    },
    errorClick: function (e) {
        optInSvc.errorClick(this);
    },
    hidAnimat: function () {
        this.setData({
            isXZHid: true,
            showMask: false
        })
    },
    hideMask: function (e) {
        this.setData({
            showMask: false,
            isXZHid: true,
            'optIn.showError': false
        });
    },
    confirmInfo:function(e){
        let inputValue = e.detail.value;
        optIn.confirmInfo(this, inputValue);
    }
})
