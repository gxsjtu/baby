const GiftSvc = require('../../services/giftSvc.js');
const LocationSvc = require('../../services/locationSvc.js');
const ShareSvc = require('../../services/shareSvc.js');
const GLOBAL = require('../../global.js');
var _ = require('../../utils/lodash.min.js');

Page({
    data: {
        imgAddress: GLOBAL.SERVER + "/images/bundles/",
        bundleId: '',
        canGetBundle: false,
        items: [],
        selectedMenuIndex: 0,
        submit: false,
        btnDefaultDisabled: false,
        btnAddressDisabled: false,
        showAlert: false,
        showMask: false,
        showError: false,
        err: '',
        btnText: '点击领取大礼包',
        words: [
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
            '七',
            '八',
            '九',
            '十'
        ],
        province: [],
        cities: [],
        selectProvince: 0,
        selectCity: 0,
        addressDetail: '',
        addressContact: '',
        addressTel: '',
        btnSubmit: false,
        scrollHeight: '',
        applies: 0,
        inventory: 0
    },
    initData: function (callback) {
        var locationSvc = new LocationSvc();
        let provinces = [];
        let inventory = 0;
        provinces.push(locationSvc.provinces[0].province);
        this.setData({ province: provinces, cities: locationSvc.provinces[0].cities });
        var giftSvc = new GiftSvc();
        giftSvc.displayBundle().then((data) => {
            let obj = data.data.data;
            if (obj) {
                this.data.canGetBundle = obj.canGetBundle;
                let imgAddress = GLOBAL.SERVER + "/images/bundles/" + obj._id + "/";
                let items = [];
                for (let i = 0; i < obj.items.length; i++) {
                    let item = obj.items[i];
                    item.imageUrl = encodeURI(imgAddress + item.name + '/' + item.name);
                    items.push(item);
                }

                if (!obj.canGetBundle) {
                    this.setData({
                        btnText: '您已领取过该礼包'
                    });
                }
                else {
                    //判断库存
                    if (obj.inventory - obj.applies <= 0) {
                        //库存不足
                        obj.canGetBundle = false;
                        this.setData({
                            btnText: '礼包已被领完'
                        });
                    }
                } 
                this.setData({
                    inventory: obj.inventory,
                    applies: obj.applies,
                    items: items,
                    imgAddress: imgAddress,
                    bundleId: obj._id,
                    btnDefaultDisabled: true
                })
            }
            if (callback) {
                callback();
            }
        }).catch(() => {
            if (callback) {
                callback();
            }
        });
    },
    onLoad: function (e) {
        this.initData();
    },
    selectFirst: function () {
        this.setData({ selectedMenuIndex: 0 });
    },
    selectSecond: function () {
        this.setData({ selectedMenuIndex: 1 });
    },
    getGift: function (e) {
        this.setData({ btnAddressDisabled: false, btnSubmit: true });
        var giftSvc = new GiftSvc();
        let province = this.data.province[this.data.selectProvince];
        let city = this.data.cities[this.data.selectCity];
        let name = this.data.addressContact;
        let tel = this.data.addressTel;
        let detail = this.data.addressDetail;
        giftSvc.getBundle(this.data.bundleId, province, city, name, tel, detail).then((data) => {
            if (data.data.message == 'OK') {
                this.data.canGetBundle = false;
                var deliveryAddress = {
                    city: city,
                    detail: detail,
                    name: name,
                    province: province,
                    tel: tel
                };
                getApp().globalData.user.deliveryAddress = deliveryAddress;
                this.setData({ btnDefaultDisabled: false, btnAddressDisabled: false, btnSubmit: false, showAlert: false, showMask: false, applies: data.data.data, btnText: '您已领取过该礼包' });
                wx.navigateTo({ url: '../myOrders/myOrders' });
            } else {
                this.setData({ btnAddressDisabled: true, btnSubmit: false });
            }
        }).catch((err) => {
            this.setData({ btnAddressDisabled: true, btnSubmit: false });
        });
    },
    onShareAppMessage: function () {
        var shareSvc = new ShareSvc();
        shareSvc.giveShare();
        return { title: '事妈驾到', path: '/pages/index/index' }
    },
    gotoDetail: function (e) {
        getApp().globalData.currentGift = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '../giftDetail/giftDetail?bundleId=' + this.data.bundleId + "&canGetBundle=" + this.data.canGetBundle
        });
    },
    hideMask: function (e) {
        this.setData({ showAlert: false, showError: false, showMask: false, btnSubmit: false });
    },
    provinceChange: function (e) {
        this.setData({ selectProvince: e.detail.value })
    },
    cityChange: function (e) {
        this.setData({ selectCity: e.detail.value })
    },
    bindKeyInput: function (e) {
        let inputType = e.currentTarget.dataset.type;
        let value = e.detail.value;
        if (inputType == 'detail') {
            this.data.addressDetail = value;
        } else if (inputType == 'contact') {
            this.data.addressContact = value;
        } else if (inputType == 'tel') {
            this.data.addressTel = value;
        }
        this.checkAddress();
    },
    checkAddress: function () {
        if (this.data.addressDetail && this.data.addressContact && this.data.addressTel) {
            this.setData({ btnAddressDisabled: true });
        } else {
            this.setData({ btnAddressDisabled: false });
        }
    },
    showAlert: function (e) {
        this.setData({ btnSubmit: true });
        var giftSvc = new GiftSvc();
        giftSvc.canGetBundle(this.data.bundleId).then((data) => {
            if (data.data.data.res == 'no') {
                this.showError(data.data.data.message);
                this.setData({ btnDefaultDisabled: true, btnSubmit: false });
            }
            else {
                if (data.data.data.address) {
                    let address = data.data.data.address;
                    let selectProvince = _.findIndex(this.data.province, function (p) {
                        return p == address.province;
                    });
                    let selectCity = _.findIndex(this.data.cities, function (c) {
                        return c == address.city;
                    });
                    this.setData({
                        selectProvince: (selectProvince == -1 ? 0 : selectProvince),
                        selectCity: (selectCity == -1 ? 0 : selectCity),
                        addressDetail: address.detail,
                        addressContact: address.name,
                        addressTel: address.tel
                    });
                }
                else {
                    this.setData({
                        selectProvince: 0,
                        selectCity: 0,
                        addressDetail: '',
                        addressContact: '',
                        addressTel: ''
                    });
                }

                this.checkAddress();
                this.setData({ showAlert: true, showMask: true });
            }
        });
    },
    showError: function (err) {
        this.setData({ showError: true, showMask: true, err: err });
    },
    onPullDownRefresh: function () {
        this.initData(() => {
            wx.stopPullDownRefresh();
        });
    }
})
