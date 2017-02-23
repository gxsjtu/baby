const GiftSvc = require('../../services/giftSvc.js');
const LocationSvc = require('../../services/locationSvc.js');
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
        words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        province: [],
        cities: [],
        selectProvince: 0,
        selectCity: 0,
        addressDetail: '',
        addressContact: '',
        addressTel: '',
        btnSubmit: false,
        scrollHeight: ''
    },
    onLoad: function (e) {
        var locationSvc = new LocationSvc();
        let provinces = [];
        provinces.push(locationSvc.provinces[0].province);
        this.setData({
            province: provinces,
            cities: locationSvc.provinces[0].cities
        });

        if (getApp().globalData.user.deliveryAddress) {
            let address = getApp().globalData.user.deliveryAddress;
            let selectProvince = _.findIndex(this.data.province, function (p) { return p == address.province; });
            let selectCity = _.findIndex(this.data.cities, function (c) { return c == address.city; });
            this.setData({
                selectProvince: (selectProvince == -1 ? 0 : selectProvince),
                selectCity: (selectCity == -1 ? 0 : selectCity),
                addressDetail: address.detail,
                addressContact: address.name,
                addressTel: address.tel
            });
        }
        var giftSvc = new GiftSvc();
        giftSvc.displayBundle().then((data) => {
            let obj = data.data.data;
            if (obj) {
                let imgAddress = GLOBAL.SERVER + "/images/bundles/" + obj._id + "/";
                let items = [];
                for(let i = 0; i<data.data.data.items.length; i++){
                    let item = data.data.data.items[i];
                    item.imageUrl = encodeURI(imgAddress + item.name+'/'+item.name);
                    items.push(item);
                }
                this.setData({
                    // items: data.data.data.items,
                    items: items,
                    imgAddress: imgAddress,
                    bundleId: obj._id,
                    btnDefaultDisabled: obj.canGetBundle
                })
            }
        });
    },
    selectFirst: function () {
        this.setData({
            selectedMenuIndex: 0
        });
    },
    selectSecond: function () {
        this.setData({
            selectedMenuIndex: 1
        });
    },
    getGift: function (e) {
        this.setData({
            btnAddressDisabled: false,
            btnSubmit: true
        });
        var giftSvc = new GiftSvc();
        let province = this.data.province[this.data.selectProvince];
        let city = this.data.cities[this.data.selectCity];
        let name = this.data.addressContact;
        let tel = this.data.addressTel;
        let detail = this.data.addressDetail;
        giftSvc.getBundle(this.data.bundleId, province, city, name, tel, detail).then((data) => {
            if (data.data.message == 'OK') {
                this.setData({
                    btnDefaultDisabled: false,
                    btnAddressDisabled: false,
                    btnSubmit: false
                });
            }
            else {
                this.setData({
                    btnAddressDisabled: true,
                    btnSubmit: false
                });
            }
        }).catch((err) => {
            this.setData({
                btnAddressDisabled: true,
                btnSubmit: false
            });
        });
    },
    gotoDetail: function (e) {
        getApp().globalData.currentGift = e.currentTarget.dataset.item;
        wx.navigateTo({ url: '../giftDetail/giftDetail?bundleId='+this.data.bundleId });
    },
    hideMask: function (e) {
        this.setData({
            showAlert: false
        });
    },
    provinceChange: function (e) {
        this.setData(
            {
                selectProvince: e.detail.value
            }
        )
    },
    cityChange: function (e) {
        this.setData(
            {
                selectCity: e.detail.value
            }
        )
    },
    bindKeyInput: function (e) {
        let inputType = e.currentTarget.dataset.type;
        let value = e.detail.value;
        if (inputType == 'detail') {
            this.data.addressDetail = value;
        }
        else if (inputType == 'contact') {
            this.data.addressContact = value;
        } else if (inputType == 'tel') {
            this.data.addressTel = value;
        }
        this.checkAddress();
    },
    checkAddress: function () {
        if (this.data.addressDetail && this.data.addressContact && this.data.addressTel) {
            this.setData({
                btnAddressDisabled: true
            });
        }
        else {
            this.setData({
                btnAddressDisabled: false
            });
        }
    },
    showAlert: function (e) {
        this.checkAddress();
        this.setData({
            showAlert: true
        });
    }
})