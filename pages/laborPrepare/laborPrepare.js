const GLOBAL = require('../../global.js');
// var clone = require('../../utils/lodash.clone');
var _ = require('../../utils/lodash.min.js');
Page({
    data: {
        warning: [],
        cards: [],
        documents: [],
    },
    onLoad: function (param) {
        this.getPageData(param.do);
    },
    getPageData: function (option) {
        let pageData = {}; 
        let arrWarning = pageData.warnings;
        let documents = pageData.documents;
        let arrCard = [];
        if (pageData.cards.length > 0) {
            for (let i = 0; i < pageData.cards.length; i++) {
                let obj = {};
                obj.name = pageData.cards[i].name;
                obj.steps = [];
                obj.images = [];
                for (let j = 0; j < pageData.cards[i].steps.length; j++) {
                    obj.steps.push(pageData.cards[i].steps[j]);
                }
                arrCard.push(obj);
            }
            noData = false;
        }

        this.setData({ warning: arrWarning, cards: arrCard, noData: noData, documents: documents });
    }
})
