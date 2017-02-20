const optIn = require("../../utils/optIn.js");
var _ = require('../../utils/lodash.min.js');

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
            enable: [true, true, true]
        },
        isXZHid: true,
        pageName: '',
        animationData: {},
        xzType: "",
        showMask: false,
        modalBottom: ""
    },
    onLoad: function (e) {
        wx.getSystemInfo({
            success: (res) => {
                var h = (res.windowHeight / 2 - 150) + "px";
                this.setData({
                    modalBottom: h
                })
            }
        })
        this.data.pageName = e.pageName;
        let globalData = getApp().globalData;
        let modals = getApp().globalData.user.modals;
        var modal = _.filter(modals, (m) => {
            return m == this.data.pageName;
        })
        if (modal != null && modal != undefined && modal.length > 0) {
            this.setData({
                "optIn.enable[1]": false
            })
        }

        this.data.delta = e.delta;
        var pId = e.pageId;
        this.data.pageId = pId;
        var fromStr = e.fromStr;

        if (pId == '26') {
            this.setData({ title: '申请生育保险小结', needs: globalData.dataList, xzType: "致富达人" });
        } else if (pId == '3') {
            if (e.type == "1") {
                this.setData({
                    xzType: "小卡好战士",
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证', '早期检查单（医院开具或现场检查）']
                });
            } else {
                this.setData({
                    xzType: "小卡好战士",
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证', '早期检查单（医院开具或现场检查）', '居住证及复印件(正反面)或租房合同']
                });
            }

        } else {
            if (pId == "23") {
                this.setData({ title: '申报宝宝户口', needs: globalData.dataList, xzType: "五好家庭" });
            } else if (pId == "24") {
                this.setData({ title: '办理宝宝医疗保险', needs: globalData.dataList, xzType: "无忧青年" });
            } else if (pId == "25") {
                this.setData({ title: '办理少儿互助基金', needs: globalData.dataList, xzType: "互助榜样" });
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
        optIn.medalClick(this);
    },
    errorClick: function (e) {

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
            isXZHid: true
        });
    },
})
