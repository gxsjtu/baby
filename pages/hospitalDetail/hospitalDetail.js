const HospitalSvc = require('../../services/hospitalSvc.js')
const GLOBAL = require('../../global.js');

Page({
    data: {
        hasHos: false,
        hospital: {},
        imgAddress: GLOBAL.SERVER + "/images/",
        imgSrc: "#",
        btnDefaultDisabled: false,
        ishid: true
    },
    setDefault: function () {
        //show loading
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
            ishid:false
        })
    },
    hidModal: function(){
        this.setData({
            ishid:true
        })
    },
    onLoad: function (e) {
        //获取窗口高度
        wx.getSystemInfo({
            success: (res) => {
                // success
                var h = (res.windowHeight - 55 - 1 - 2 - 2);
                this.setData({
                    scrollHeight: (h) + "px"
                })
            }
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
    }
})
