const GLOBAL = require('../../global.js');
var clone = require('../../utils/lodash.clone');
Page({
    data: {
        warning: [],
        cards: [],
        imgWidth:182
    },
    onLoad: function (e) {
        let hospital = getApp().globalData.hospital;
        let setCard = hospital.setCard;
        let hospitalName = hospital.name;
        let imgAddress = GLOBAL.SERVER + "/images/"+hospitalName;
        wx.setNavigationBarTitle({
            title:hospitalName
        });
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
                let baseId = "img-" + (+ new Date());
                for (let j = 0; j < setCard.cards[i].images.length; j++) {
                    let url = encodeURI(imgAddress+'/cards/'+setCard.cards[i].images[j]);
                    var image = {};
                    image.height = 0;
                    image.url = url;
                    image.id = baseId + "-" + i + "-" + j;
                    image.hidden = true;
                    obj.images.push(image);
                }
                arrCard.push(obj);
            }

            this.setData({
                warning: arrWarning,
                cards: arrCard
            });
        }
    },
    onImageLoad:function(e){
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; //比例计算
        let imgHeight = oImgH * scale; //自适应高度
        let cards = clone(this.data.cards);
        for (let i = 0; i < cards.length; i++) {
            for(let j = 0; j<cards[i].images.length;j++){
                let img = cards[i].images[j];
                if (img.id === imageId) {
                    img.height = imgHeight;
                    img.hidden = false;
                    break;
                }
            }
        }

        this.setData({
            cards:cards
        });
        
    },
    showImages:function(e){
        let curr = e.target.dataset.url;
        let images = e.target.dataset.images;
        let urls = [];
        for(let i = 0; i<images.length;i++){
            urls.push(images[i].url)
        }
        wx.previewImage({
            current: curr,
            urls: urls,
            success: function(e) {
                
            },
            fail: function(e) {
                
            }
        });
    }
})