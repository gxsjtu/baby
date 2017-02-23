const HospitalSvc = require('../../services/hospitalSvc.js');
// const filter = require('../../utils/lodash.filter');
var _ = require('../../utils/lodash.min.js');
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
            enable: [true, true, true],
            showError: false
        },
        fromStr: "",
        list: [],
        isPackage: true //标识用来显示哪张title图片
    },
    goReady: function (e) {
        var hospital = getApp().globalData.hospital;
        var pid = e.currentTarget.dataset.packageId;
        var hospitalSvc = new HospitalSvc();
        hospitalSvc.updatePackages(pid).then(data => {
            if (data.data.message == "OK") {
                // console.log(data);
                if (this.data.fromStr == "package") {
                    var packages = data.data.data;
                    if (packages != null && packages != undefined && packages.length > 0) {
                        var pList = [];

                        for (var i = 0; i < hospital.packages.length; i++) {
                            var pItemList = [];
                            var pItems = hospital.packages[i].items;
                            for (var j = 0; j < pItems.length; j++) {
                                let item = _.filter(packages, (p) => {
                                    return p == pItems[j].id;
                                })
                                if (item != null && item != undefined && item.length > 0) {
                                    pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: true });
                                } else {
                                    pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: false });
                                }
                            }
                            pList.push({ name: hospital.packages[i].name, items: pItemList });
                        }
                        this.setData({ list: pList })
                    } else {
                        this.setData({ list: hospital.packages })
                    }
                    getApp().globalData.user.packages = packages;
                    // getApp().globalData.userPackages = packages;
                }
                else {
                    var prepares = data.data.data;
                    if (prepares != null && prepares != undefined && prepares.length > 0) {
                        var pList = [];

                        for (var i = 0; i < hospital.prepares.length; i++) {
                            var pItemList = [];
                            var pItems = hospital.prepares[i].items;
                            for (var j = 0; j < pItems.length; j++) {
                                let item = _.filter(prepares, (p) => {
                                    return p == pItems[j].id;
                                })
                                if (item != null && item != undefined && item.length > 0) {
                                    pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: true });
                                } else {
                                    pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: false });
                                }
                            }
                            pList.push({ name: hospital.prepares[i].name, items: pItemList });
                        }
                        this.setData({ list: pList });
                    } else {
                        this.setData({ list: hospital.prepares })
                    }
                    getApp().globalData.user.prepares = prepares;
                }
            }
        });
    },
    onLoad: function (param) {
        wx.getSystemInfo({
            success: (res) => {
                var h = (res.windowHeight / 2 - 150) + "px";
                var s = (res.windowHeight - 196) + "px";
                this.setData({
                    modalBottom: h,
                    scrollHeight: s
                })
            }
        })
        var fromStr = param.from;
        this.data.fromStr = fromStr;
        var hospital = getApp().globalData.hospital;

        this.data.pageName = param.pageName;
        optIn.setOptInData(this);
        var actionSvc = new ActionSvc()
        actionSvc.getModalByPageName(this.data.pageName).then(data => {
            this.setData({ xzType: data });
        })
        if (fromStr == "package") {
            wx.setNavigationBarTitle({
                title: '购买待产准备包'
            });
            var userPackages = getApp().globalData.user.packages;
            // console.log(userPackages);
            if (userPackages != null && userPackages != undefined && userPackages.length > 0) {
                var pList = [];
                for (var i = 0; i < hospital.packages.length; i++) {
                    var pItems = hospital.packages[i].items;
                    var pItemList = [];
                    for (var j = 0; j < pItems.length; j++) {
                        var item = _.filter(userPackages, (p) => {
                            return p == pItems[j].id;
                        })
                        if (item != null && item != undefined && item.length > 0) {
                            pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: true });
                        } else {
                            pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: false });
                        }
                    }
                    pList.push({ name: hospital.packages[i].name, items: pItemList });
                }
                this.setData({ list: pList, isPackage:true })
            } else {
                this.setData({ list: hospital.packages, isPackage:true })
            }
        } else {
            wx.setNavigationBarTitle({
                title: '入院前准备'
            });
            // let userPackages = getApp().globalData.user;
            var userPrepares = getApp().globalData.user.prepares;
            if (userPrepares != null && userPrepares != undefined && userPrepares.length > 0) {
                var pList = [];
                for (var i = 0; i < hospital.prepares.length; i++) {
                    var pItemList = [];
                    var pItems = hospital.prepares[i].items;
                    for (var j = 0; j < pItems.length; j++) {
                        var item = _.filter(userPrepares, (p) => {
                            return p == pItems[j].id;
                        })
                        if (item != null && item != undefined && item.length > 0) {
                            pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: true });
                        } else {
                            pItemList.push({ id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: false });
                        }
                    }
                    pList.push({ name: hospital.prepares[i].name, items: pItemList });
                }
                this.setData({ list: pList, isPackage:false });
            }
            else {
                this.setData({ list: hospital.prepares, isPackage:false });
            }
            // console.log(hospital);
        }
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
    }
})
