const GLOBAL = require('../../global.js');
var clone = require('../../utils/lodash.clone');
Page({
    data: {
        warning: [],
        cards: [],
        documents: [],
        imgWidth: 182,
        imageUrl:'',
        title: '唐氏筛查是唐氏综合症产前筛选检查的简称。60%患儿在胎内早期即流产，存活者有明显的智能落后、特殊面容、生长发育障碍和多发畸形。目的是通过化验孕妇的血液，结合孕妇的年龄，体重，孕周等方面来判断胎儿患先天愚型、神经管缺陷的危险系数。',
        option: '唐氏筛查',
        noData: false
    },
    onLoad: function (param) {
        this.getPageData(param.do);
    },
    getPageData: function (option) {
        let hospital = getApp().globalData.hospital;
        let hospitalName = hospital.name;
        let imgAddress = GLOBAL.SERVER + "/images/" + hospitalName;

        if (option == 'card') {
            //建大卡
            if (hospital.setCard) {
                let setCard = hospital.setCard;
                let arrWarning = setCard.warnings;
                let documents = setCard.documents;
                let title = setCard.titles;
                let arrCard = [];
                let noData = true;
                let url = encodeURI(imgAddress + '/cards/title');
                if (setCard.cards.length > 0) {
                    for (let i = 0; i < setCard.cards.length; i++) {
                        let obj = {};
                        obj.name = setCard.cards[i].name;
                        obj.steps = [];
                        obj.images = [];
                        for (let j = 0; j < setCard.cards[i].steps.length; j++) {
                            obj.steps.push(setCard.cards[i].steps[j]);
                        }
                        let baseId = "img-" + (+ new Date());
                        for (let j = 0; j < setCard.cards[i].images.length; j++) {
                            let url = encodeURI(imgAddress + '/cards/' + setCard.cards[i].images[j]);
                            var image = {};
                            image.height = 0;
                            image.url = url;
                            image.id = baseId + "-" + i + "-" + j;
                            image.hidden = true;
                            obj.images.push(image);
                        }
                        arrCard.push(obj);
                    }
                    noData = false;
                }

                this.setData({ warning: arrWarning, cards: arrCard, noData: noData,imageUrl:url,documents:documents,title:title});
            }
            else {
                this.setData({
                    noData: true
                });
            }
        }

    },
    onImageLoad: function (e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; //比例计算
        let imgHeight = oImgH * scale; //自适应高度
        let cards = clone(this.data.cards);
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < cards[i].images.length; j++) {
                let img = cards[i].images[j];
                if (img.id === imageId) {
                    img.height = imgHeight;
                    img.hidden = false;
                    break;
                }
            }
        }
        this.setData({ cards: cards });
    },
    showImages: function (e) {
        let curr = e.target.dataset.url;
        let images = e.target.dataset.images;
        let urls = [];
        for (let i = 0; i < images.length; i++) {
            urls.push(images[i].url)
        }
        wx.previewImage({ current: curr, urls: urls, success: function (e) { }, fail: function (e) { } });
    }
})
