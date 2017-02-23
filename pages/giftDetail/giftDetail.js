const GLOBAL = require('../../global.js');

Page({
    data: {
        logo: '',
        description: '',
        details: [],
        recommends: [],
        discounts: [],
        images:[]
    },
    onLoad: function (e) {
        console.log(getApp().globalData.currentGift);

        let gift = getApp().globalData.currentGift;
        let imgAddress = GLOBAL.SERVER + "/images/bundles/" + e.bundleId + "/" + gift.name + "/logo";
        let description = gift.description;
        let details = gift.details;
        let recommends = gift.recommends;
        let experiences = gift.experiences;
        let discounts = [];
        //惠@买一送一。第一次购买五谷粮膜，送一片价值20元的肌底修护眼贴膜。
        for (let i = 0; i < gift.discounts.length; i++) {
            let discount = {};
            let str = gift.discounts[i].split('@');
            if (str[0] == '惠') {
                //优惠
                discount.image = 'hui.png';
                discount.content = str[1];
                discounts.push(discount);
            }
        }
        this.setData({
            description: description,
            details: details,
            logo: imgAddress,
            recommends: recommends,
            discounts: discounts,
            experiences:experiences
        })

    }
})