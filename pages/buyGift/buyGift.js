const GLOBAL = require('../../global.js');
const BuySvc = require('../../services/buySvc.js');
const LocationSvc = require('../../services/locationSvc.js');
const PaymentSvc = require('../../services/paymentSvc.js');
var _ = require('../../utils/lodash.min.js');

Page({
    data: {
        count: 1,
        hasAddress: false,
        scrollHeight: '',
        provinces: [],
        cities: [],
        selectProvince: 0,
        selectCity: 0,
        selectInputProvince: 0,
        selectInputCity: 0,
        addressDetail: '',
        addressContact: '',
        addressTel: '',
        showAddress: false,
        btnAddressDisabled: false,
        address: '',
        itemId: '',
        inputName: '',
        inputTel: '',
        inputProvince: '',
        inputCity: '',
        inputDetail: ''
    },
    onLoad: function (e) {
        var locationSvc = new LocationSvc();
        let provinces = [];
        provinces.push(locationSvc.provinces[0].province);
        this.setData({ provinces: provinces, cities: locationSvc.provinces[0].cities });

        var buySvc = new BuySvc();
        buySvc.getDeliveryAddress().then((data) => {
            if (data.data.message == 'OK') {
                this.setData({ hasAddress: true });

                let province = data.data.data.province;
                let city = data.data.data.city;

                let selectProvince = _.findIndex(this.data.provinces, function (p) {
                    return p == province;
                });
                let selectCity = _.findIndex(this.data.cities, function (c) {
                    return c == city;
                });
                let name = data.data.data.name;
                let tel = data.data.data.tel;
                let detail = data.data.data.detail;
                let address = province + city + detail;
                this.data.province = province;
                this.data.city = city;
                this.data.detail = detail;
                this.setData({ showAddress: false, hasAddress: true, address: address, addressContact: name, addressTel: tel, selectProvince: selectProvince, selectCity: selectCity,selectInputProvince: selectProvince, selectInputCity: selectCity, addressDetail: detail });
            }
            else {
                this.setData({ hasAddress: false });
            }
        });

        var pageName = e.pageName;
        let item = {};
        if (pageName == 'gift') {
            //礼包
            var bId = e.id;
            let gift = getApp().globalData.currentGift;
            item.desc = gift.description;
            item.detail = gift.details && gift.details.length > 0
                ? gift.details[0]
                : '';
            this.setData({
                item: item,
                imgAddress: GLOBAL.SERVER + "/images/bundles/" + bId + "/" + gift.name + "/" + gift.name
            })
        } else if (pageName == 'buy') {
            let buy = getApp().globalData.selectedBuy;
            this.data.itemId = buy._id;
            item.title = buy.title + ' ' + buy.subtitle;
            item.name = buy.brand + buy.name;
            item.spec = buy.spec;
            item.price = buy.price;
            this.setData({
                item: item,
                imgAddress: GLOBAL.SERVER + "/images/items/" + buy._id + "/logo"
            })
        }
    },
    reduce: function () {
        if (this.data.count > 1) {
            this.setData({
                count: this.data.count - 1
            });
        }
    },
    add: function () {
        this.setData({
            count: this.data.count + 1
        });
    },
    provinceChange: function (e) {
        this.setData({ selectInputProvince: e.detail.value })
    },
    cityChange: function (e) {
        this.setData({ selectInputCity: e.detail.value })
    },
    bindKeyInput: function (e) {
        let inputType = e.currentTarget.dataset.type;
        let value = e.detail.value.replace(/\s+/g, '');
        if (inputType == 'detail') {
            this.data.inputDetail = value;
        } else if (inputType == 'contact') {
            this.data.inputName = value;
        } else if (inputType == 'tel') {
            this.data.inputTel = value;
        }
        this.checkAddress();
    },
    checkAddress: function () {
        if (this.data.inputDetail && this.data.inputName && this.data.inputTel) {
            this.setData({ btnAddressDisabled: true });
        } else {
            this.setData({ btnAddressDisabled: false });
        }
    },
    clickAlert: function () { },
    hideMask: function () {
        this.setData({ showAddress: false });
    },
    showAddressPage: function () {
        this.setData({ showAddress: true, selectInputProvince: this.data.selectProvince, selectInputCity: this.data.selectCity, inputDetail: this.data.addressDetail, inputName: this.data.addressContact, inputTel: this.data.addressTel });
        this.checkAddress();
        console.log(this.data.selectInputCity);
    },
    setAddress: function () {
        let province = this.data.provinces[this.data.selectInputProvince];
        let city = this.data.cities[this.data.selectInputCity];
        let name = this.data.inputName;
        let tel = this.data.inputTel;
        let detail = this.data.inputDetail;
        let address = province + city + detail;
        this.data.province = province;
        this.data.city = city;
        this.data.detail = detail;
        this.setData({ showAddress: false, hasAddress: true, address: address, addressContact: name, addressTel: tel, selectProvince: this.data.selectInputProvince, selectCity: this.data.selectInputCity, addressDetail: detail });
    },
    inputNumber: function (e) {
        let count = 1;
        if (e.detail.value != '') {
            count = parseInt(e.detail.value);
            if (count && count > 0) { } else {
                count = 1;
            }
        }
        this.setData({ count: count })
    },
    buy: function (e) {
        var paymentSvc = new PaymentSvc();
        let obj = {};
        obj.itemId = this.data.itemId;
        obj.quantity = this.data.count;
        obj.province = this.data.province;
        obj.city = this.data.city;
        obj.detail = this.data.detail;
        obj.tel = this.data.addressTel;
        obj.name = this.data.addressContact;
        paymentSvc.makePayment(obj).then((data) => {
            console.log(data);
        });
    }
})
