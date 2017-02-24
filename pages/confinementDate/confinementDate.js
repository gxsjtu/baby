const ConfinementDateSvc = require('../../services/confinementDateSvc.js')
var optIn = require('../../utils/optIn.js');
const ActionSvc = require("../../services/actionSvc.js");

Page({
    data: {
        scrollHeight: "",
        isXZHid: true,
        pageName: '',
        animationData: {},
        xzType: "",
        showMask: false,
        modalBottom: "",
        optIn: {
            num: 0,
            enable: [true, true, false],
            showError: false,
            bottom: 0,
            platform: '',
            inputValue: ''
        },
        showResult: false,
        averageIndex: 8,
        year: '',
        month: '',
        date: '',
        preBorn: '',
        week: '',
        fromNow: '',
        start: '',
        end: '',
        selectDate: '',
        btnChecking: false,
        averageArr: [
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45
        ]
    },
    onLoad: function (e) {
        wx.getSystemInfo({
            success: (res) => {
                var h = (res.windowHeight / 2 - 150) + "px";
                var s = (res.windowHeight - 95) + "px";
                this.setData({
                    modalBottom: h,
                    scrollHeight: s,
                    'optIn.platform': res.platform
                })
            }
        })
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let start = (year - 1) + '-01-01';
        let end = (year + 1) + '-12-31';

        let selectDate = year + (month < 10
            ? '-0' + month
            : '-' + month) + (date < 10
                ? '-0' + date
                : '-' + date);
        this.setData({
            start: start,
            end: end,
            year: year,
            month: month,
            date: date,
            selectDate: selectDate,
            average: this.data.averageArr[8]
        });
        this.data.pageName = e.pageName;
        optIn.setOptInData(this);
        var actionSvc = new ActionSvc()
        actionSvc.getModalByPageName(this.data.pageName).then(data => {
            this.setData({ xzType: data });
        })
    },
    check: function (e) {
        this.setData({
            btnChecking: true
        });
        let last = this.data.selectDate;
        var confinementDateSvc = new ConfinementDateSvc();
        confinementDateSvc.getBorn(last, this.data.average).then(data => {
            if (data.data.status == 0) {
                let preBorn = data.data.data.preBorn;
                let fromNow = data.data.data.fromNow;
                let week = data.data.data.week;
                this.setData({ preBorn: preBorn, fromNow: fromNow, week: week, showResult: true, btnChecking: false });
            } else {
                this.setData({ showResult: false, btnChecking: false });
                wx.showToast({ title: data.data.message, duration: 3000 })
            }

        }).catch((err) => {
            this.setData({
                btnChecking: false
            });
        });
    },
    hiddenMask: function (e) {
        this.setData({ showResult: false });
    },
    changeDate: function (e) {
        let select = e.detail.value;
        let arr = select.split('-');
        this.setData({ year: arr[0], month: arr[1], date: arr[2], selectDate: select });
    },
    changeAverage: function (e) {
        let index = e.detail.value;
        this.setData({ averageIndex: index, average: this.data.averageArr[index] });
    },
    hideMask: function (e) {
        this.setData({
            showDesc: false,
            showMask: false,
            isXZHid: true,
            'optIn.showError': false
        });
    },
    usefulClick: function (e) {
        //点赞
        optIn.usefulClick(this);
    },
    medalClick: function (e) {
        optIn.medalClick(this);
    },
    errorClick: function (e) {
        optIn.errorClick(this);
    },
    hidAnimat: function () {
        this.setData({
            isXZHid: true,
            showMask: false
        })
    },
    textFocus: function (e) {
        //获得焦点
        optIn.textFocus(this);
    },
    textBlur: function (e) {
        //失去焦点
        optIn.textBlur(this);
    },
    submitErrorInfo: function (e) {
        optIn.submitErrorInfo(this);
    },
    textInput: function (e) {
        optIn.textInput(this, e.detail.value);
    }
})
