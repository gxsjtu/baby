const GLOBAL = require('../../global.js');

Page({
    data: {
        warning: [],
        cards: []
    },
    onLoad: function (e) {
        let setCard = getApp().globalData.hospital.setCard;
        if (setCard) {

            let arrWarning = setCard.warnings;

            let arrCard = [];
            for (let i = 0; i < setCard.cards.length; i++) {
                let obj = {};
                obj.name = setCard.cards[i].name;
                obj.steps = [];
                obj.images = [];
                for (let j = 0; j < setCard.cards[i].steps.length; j++) {
                    obj.steps.push(setCard.cards[i].steps[j]);
                }

                for (let j = 0; j < setCard.cards[i].images.length; j++) {
                    obj.images.push(setCard.cards[i].images[j]);
                }
                arrCard.push(obj);
            }

            this.setData({
                warning: arrWarning,
                cards: arrCard
            });
        }
        console.log(this.data)
    }
})