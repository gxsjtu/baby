const HospitalSvc = require('../../services/hospitalSvc.js');
// const filter = require('../../utils/lodash.filter');
var _ = require('../../utils/lodash.min.js');

Page({
    data: {
        list: []
    },
    goReady: function(e) {
        let hospital = getApp().globalData.hospital;
        var pid = e.currentTarget.dataset.packageId;
        var hospitalSvc = new HospitalSvc();
        hospitalSvc.updatePackages(pid).then(data => {
            if (data.data.message == "OK") {
                var packages = data.data.data;
                if (packages != null && packages != undefined && packages.length > 0) {
                    var pList = [];
                    var pItemList = [];
                    for (var i = 0; i < hospital.packages.length; i++) {
                        let pItems = hospital.packages[i].items;
                        for (var j = 0; j < pItems.length; j++) {
                            let item = _.filter(packages, (p) => {
                                return p == pItems[j].id;
                            })
                            if (item != null && item != undefined && item.length > 0) {
                                pItemList.push({id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: true});
                            } else {
                                pItemList.push({id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: false});
                            }
                        }
                        pList.push({name: hospital.packages[i].name, items: pItemList});
                    }
                    this.setData({list: pList})
                } else {
                    this.setData({list: hospital.packages})
                }
            }
        });
    },
    onLoad: function(param) {
        let fromStr = param.from;
        let hospital = getApp().globalData.hospital;

        if (fromStr == "package") {
            let userPackages = getApp().globalData.userPackages;
            // console.log(userPackages);
            if (userPackages != null && userPackages != undefined && userPackages.length > 0) {
                var pList = [];
                var pItemList = [];
                for (var i = 0; i < hospital.packages.length; i++) {
                    let pItems = hospital.packages[i].items;
                    for (var j = 0; j < pItems.length; j++) {
                        let item = _.filter(userPackages, (p) => {
                            return p == pItems[j].id;
                        })
                        if (item != null && item != undefined && item.length > 0) {
                            pItemList.push({id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: true});
                        } else {
                            pItemList.push({id: pItems[j].id, name: pItems[j].name, quantity: pItems[j].quantity, isReady: false});
                        }
                    }
                    pList.push({name: hospital.packages[i].name, items: pItemList});
                }
                this.setData({list: pList})
            } else {
                this.setData({list: hospital.packages})
            }
        } else {}
    }
})
