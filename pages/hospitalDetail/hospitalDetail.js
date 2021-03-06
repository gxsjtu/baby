const HospitalSvc = require('../../services/hospitalSvc.js')
const GLOBAL = require('../../global.js');
const ActionSvc = require("../../services/actionSvc.js");
var optInSvc = require('../../utils/optIn.js');

Page({
    data: {
        hasHos: false,
        hospital: {},
        imgAddress: GLOBAL.SERVER + "/images/",
        imgSrc: "#",
        btnDefaultDisabled: false,
        ishid: true,
        optIn: {
            num: 0,
            enable: [true, true, true],
            showError: false,
            bottom: 0,
            platform: '',
            inputValue: ''
        },
        isXZHid: true,
        pageName: '',
        animationData: {},
        xzType: "",
        showMask: false,
        modalBottom: "",
        scrollHeight: "",
        pageName: "",
        hospitalId: ""
    },
    setDefault: function (e) {
        //show loading
        this.data.pageName = e.pageName;
        var hospitalSvc = new HospitalSvc();
        this.setData({ btnDefaultDisabled: true });
        console.log(this.data.hospital);
        hospitalSvc.setDefaultHospital(this.data.hospital._id).then(() => {
            //设置改按钮灰色
            //this.setData({btnDefaultDisabled: true});
            getApp().globalData.defaultHos = this.data.hospital;
        }).catch(err => {
            //提示设置失败
            this.setData({ btnDefaultDisabled: false });
            wx.showToast({ title: '设置失败，请重试！', icon: 'success', duration: 2000 })
        });
    },
    gotoImg: function () {
        wx.navigateTo({
            url: '../hospitalImage/hospitalImage?id=' + this.data.hospital._id + '&name=' + this.data.hospital.name
        });
    },
    gotoBF: function () {
        wx.navigateTo({ url: '../hospitalRooms/hospitalRooms' });
    },
    callTel: function (e) {
        var hos = this.data.hospital.tel;
        var telArray = [];
        telArray.push(hos.main.name + "：" + hos.main.number);
        if (hos.others != null && hos.others != undefined && hos.others.length > 0) {
            for (var i = 0; i < hos.others.length; i++) {
                telArray.push(hos.others[i].name + "：" + hos.others[i].number);
            }
        }
        wx.showActionSheet({
            itemList: telArray,
            success: function (res) {
                var telStr = telArray[res.tapIndex];
                if (telStr != null && telStr != undefined) {
                    var idx = telStr.indexOf("：");
                    if (idx >= 0) {
                        var tel = telStr.substring(idx + 1);
                        wx.makePhoneCall({
                            phoneNumber: tel, success: function (res) {
                                // success
                            }
                        })
                    }
                }
            },
            fail: function (res) {

            }
        })
    },
    gotoYW: function () {
        wx.navigateTo({ url: '../hospitalTerms/hospitalTerms' });
    },
    gotoCard: function () {
        //wx.navigateTo({ url: '../hospitalCard/hospitalCard' });
        wx.navigateTo({ url: '../hospitalCard/hospitalCard?do=cards' });
    },
    gotoVIP: function () {
        wx.navigateTo({ url: '../hospitalVip/hospitalVip' });
    },
    showM: function () {
        this.setData({
            ishid: false
        })
    },
    hidModal: function () {
        this.setData({
            ishid: true
        })
    },
    onLoad: function (e) {
        this.data.hospitalId = e.id;
        wx.getSystemInfo({
            success: (res) => {
                var h = (res.windowHeight / 2 - 150) + "px";
                var s = (res.windowHeight - 50 - 55 - 1 - 2 - 2) + "px";
                this.setData({
                    modalBottom: h,
                    scrollHeight: s,
                    'optIn.platform': res.platform
                })
            }
        })

        this.data.pageName = e.pageName;
        optInSvc.setOptInData(this);
        var actionSvc = new ActionSvc()
        actionSvc.getModalByPageName(this.data.pageName).then(data => {
            this.setData({ xzType: data });
        })

        var id = e.id;
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000, mask: true });
        var hospitalSvc = new HospitalSvc();
        hospitalSvc.getHospitalByID(id).then(data => {
            var globalData = getApp().globalData;
            globalData.hospital = data.data.data;
            this.setData({ hospital: globalData.hospital, hasHos: true })
            if (globalData.defaultHos._id === this.data.hospital._id) {
                this.setData({ btnDefaultDisabled: true });
            }

            wx.hideToast();
        }).catch(() => {
            wx.hideToast();
        })
    },
    usefulClick: function (e) {
        //点赞
        // var actionSvc = new ActionSvc();
        // var app = getApp();
        optInSvc.usefulClick(this);
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
