const GLOBAL = require('../../global.js');
var clone = require('../../utils/lodash.clone');
Page({
    data: {
        warning: [],
        cards: [],
        documents: [],
        imgWidth: 182,
        imageUrl: '',
        title: '',
        option: '',
        showDesc: false,
        noData: false
    },
    onLoad: function (param) {
        this.getPageData(param.do);
    },
    getPageData: function (option) {
        let hospital = getApp().globalData.hospital;
        let hospitalName = hospital.name;
        let imgAddress = GLOBAL.SERVER + "/images/" + hospitalName;

        let pageData = {};
        let userOption = '';
        if (option == 'cards') {
            //建大卡
            userOption = '建卡';
            if (hospital.setCard) {
                pageData = hospital.setCard;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }
        else if (option == 'downs') {
            userOption = '唐筛';
            if (hospital.down) {
                pageData = hospital.down;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }
        else if(option == 'inspections'){
            userOption = '大排畸';
            if (hospital.inspection) {
                pageData = hospital.inspection;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }

        wx.setNavigationBarTitle({
            title: userOption
        })
        let arrWarning = pageData.warnings;
        let documents = pageData.documents;
        let title = pageData.titles;
        let arrCard = [];
        let noData = true;
        let url = encodeURI(imgAddress + '/'+option+'/title');
        if (pageData.cards.length > 0) {
            for (let i = 0; i < pageData.cards.length; i++) {
                let obj = {};
                obj.name = pageData.cards[i].name;
                obj.steps = [];
                obj.images = [];
                for (let j = 0; j < pageData.cards[i].steps.length; j++) {
                    obj.steps.push(pageData.cards[i].steps[j]);
                }
                let baseId = "img-" + (+ new Date());
                if (pageData.cards[i].images) {
                    for (let j = 0; j < pageData.cards[i].images.length; j++) {
                        let url = encodeURI(imgAddress + '/'+option+'/' + pageData.cards[i].images[j]);
                        var image = {};
                        image.height = 0;
                        image.url = url;
                        image.id = baseId + "-" + i + "-" + j;
                        image.hidden = true;
                        obj.images.push(image);
                    }
                }
                arrCard.push(obj);
            }
            noData = false;
        }

        this.setData({ warning: arrWarning, cards: arrCard, noData: noData, imageUrl: url, documents: documents, title: title, option: userOption });

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
    },
    showTitle: function(e){
        this.setData({
            showDesc:true
        });
    },
    clickDesc: function(e){
        //勿删
    },
    hideMask: function(e){
        this.setData({
            showDesc:false
        });
    }
})
