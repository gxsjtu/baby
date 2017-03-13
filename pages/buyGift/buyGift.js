const GLOBAL = require('../../global.js');
const BuySvc = require('../../services/buySvc.js');
const LocationSvc = require('../../services/locationSvc.js');

Page({
    data: {
        count: 1,
        hasAddress: false,
        scrollHeight: '',
        province: [],
        cities: [],
        selectProvince: 0,
        selectCity: 0,
        addressDetail: '',
        addressContact: '',
        addressTel: '',
        showAddress: false,
        btnAddressDisabled: false,
        address: ''
    },
    onLoad: function(e) {

        // wx.getSystemInfo({
        //     success: (res) => {
        //         var h = res.windowHeight - 80 - 3 - 10 - (22 + 10 + 10) - 10 - (22 + 22 + 12 + 12 + 1) - (22 + 10 + 10) - 60;
        //         this.setData({
        //             scrollHeight: h + "px"
        //         })
        //     }
        // })

        var buySvc = new BuySvc();
        buySvc.getDeliveryAddress().then((data) => {
            if (data.data.address) {
                this.setData({hasAddress: true});
            } else {
                this.setData({hasAddress: false});
            }
        });

        var locationSvc = new LocationSvc();
        let provinces = [];
        provinces.push(locationSvc.provinces[0].province);
        this.setData({province: provinces, cities: locationSvc.provinces[0].cities});

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
    reduce: function() {
        if (this.data.count > 1) {
            this.setData({
                count: this.data.count - 1
            });
        }
    },
    add: function() {
        this.setData({
            count: this.data.count + 1
        });
    },
    provinceChange: function(e) {
        this.setData({selectProvince: e.detail.value})
    },
    cityChange: function(e) {
        this.setData({selectCity: e.detail.value})
    },
    bindKeyInput: function(e) {
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
    checkAddress: function() {
        if (this.data.addressDetail && this.data.addressContact && this.data.addressTel) {
            this.setData({btnAddressDisabled: true});
        } else {
            this.setData({btnAddressDisabled: false});
        }
    },
    clickAlert: function() {},
    hideMask: function() {
        this.setData({showAddress: false});
    },
    showAddressPage: function() {
        this.setData({showAddress: true});
    },
    setAddress: function() {
        let province = this.data.province[this.data.selectProvince];
        let city = this.data.cities[this.data.selectCity];
        let name = this.data.addressContact;
        let tel = this.data.addressTel;
        let detail = this.data.addressDetail;
        let address = province + city + detail;
        this.setData({showAddress: false, hasAddress: true, address: address, addressContact: name, addressTel: tel})
    },
    inputNumber: function(e) {
        let count = 1;
        if (e.detail.value != '') {
            count = parseInt(e.detail.value);
            if (count && count > 0) {} else {
                count = 1;
            }
        }
        this.setData({count: count})
    }
})
