const GiftSvc = require('../../services/giftSvc.js');
const GLOBAL = require('../../global.js');
Page({
    data: {
        imgAddress: GLOBAL.SERVER + "/images/bundles/",
        bundleId: '',
        canGetBundle: false,
        items: [],
        selectedMenuIndex: 0,
        submit: false,
        btnDefaultDisabled: false,
        words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    },
    onLoad: function (e) {
        var giftSvc = new GiftSvc();
        giftSvc.displayBundle().then((data) => {
            console.log(data.data.data);
            let obj = data.data.data;
            if (obj) {
                let imgAddress = GLOBAL.SERVER + "/images/bundles/" + obj._id + "/"
                this.setData({
                    items: data.data.data.items,
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
            btnDefaultDisabled: false
        });
        var giftSvc = new GiftSvc();
        giftSvc.getBundle(this.data.bundleId).then((data) => {
            console.log(data);
            if (data.data.message = 'OK') {
                this.setData({
                    btnDefaultDisabled: false
                });
            }
            else {
                this.setData({
                    btnDefaultDisabled: true
                });
            }
        }).catch((err) => {
            this.setData({
                btnDefaultDisabled: true
            });
        });
    }
})