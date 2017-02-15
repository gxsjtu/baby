const HospitalSvc = require('../../services/hospitalSvc.js');
// const filter = require('../../utils/lodash.filter');
var _ = require('../../utils/lodash.min.js');

Page({
    data: {
        fromStr: "",
        list: []
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
        var fromStr = param.from;
        this.data.fromStr = fromStr;
        var hospital = getApp().globalData.hospital;

        if (fromStr == "package") {
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
                this.setData({ list: pList })
            } else {
                this.setData({ list: hospital.packages })
            }
        } else {
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
                this.setData({ list: pList });
            }
            else {
                this.setData({ list: hospital.prepares });
            }
            // console.log(hospital);
        }
    }
})
