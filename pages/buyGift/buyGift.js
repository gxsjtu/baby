const GLOBAL = require('../../global.js');

Page({
    data: {
        count: 1,
        hasAddress: false
    },
    onLoad: function (e) {
        var pageName = e.pageName;
        let item = {};
        if (pageName == 'gift') {
            var bId = e.id;
            let gift = getApp().globalData.currentGift;
            item.desc = gift.description;
            item.detail = gift.details && gift.details.length > 0 ? gift.details[0] : '';
            console.log(gift);
            this.setData({
                item: item,
                imgAddress: GLOBAL.SERVER + "/images/bundles/" + bId + "/" + gift.name + "/" + gift.name
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
    }
})