const GLOBAL = require('../../global.js');
var _ = require('../../utils/lodash.min.js');
var optIn = require('../../utils/optIn.js');
const ActionSvc = require("../../services/actionSvc.js");

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
        noData: false,
        pageName: '',
        hospitalId: '',
        showMask: false,
        optIn: {
            num: 0,
            enable: [true, true, true],
            showError: false,
            bottom: 0,
            platform: '',
            inputValue:''
        },
        isXZHid: true,
        animationData: {},
        modalBottom: "",
        xzType: "",
        scrollHeight: "",
        hospitalTitle: ''
    },
    onLoad: function (param) {
        var res = wx.getSystemInfoSync();
        var h = (res.windowHeight / 2 - 150) + "px";
        var s = (res.windowHeight - 50) + "px";
        this.setData({
            modalBottom: h,
            scrollHeight: s,
            'optIn.platform': res.platform
        });
        this.getPageData(param.do);
    },
    getPageData: function (option) {
        let hospital = getApp().globalData.hospital;
        let hospitalName = hospital.name;
        this.data.hospitalId = hospital._id;
        let imgAddress = GLOBAL.SERVER + "/images/" + hospitalName;
        let pageData = {};
        let userOption = '';
        if (option == 'cards') {
            //建大卡
            this.data.pageName = 'hospitalCard-cards';
            userOption = '建大卡';
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
            this.data.pageName = 'hospitalCard-downs';
            userOption = '唐氏筛查';
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
        else if (option == 'inspections') {
            this.data.pageName = 'hospitalCard-inspections';
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
        else if (option == 'ogtts') {
            this.data.pageName = 'hospitalCard-ogtts';
            userOption = '糖耐量';
            if (hospital.ogtt) {
                pageData = hospital.ogtt;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }
        else if (option == 'fhrms') {
            this.data.pageName = 'hospitalCard-fhrms';
            userOption = '胎心监护';
            if (hospital.fhrm) {
                pageData = hospital.fhrm;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }
        else if (option == 'day42s') {
            this.data.pageName = 'hospitalCard-day42s';
            userOption = '产后42天检查';
            if (hospital.day42) {
                pageData = hospital.day42;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }
        else if (option == 'bornCerts') {
            this.data.pageName = 'hospitalCard-bornCerts';
            userOption = '出生医学证明';
            if (hospital.bornCert) {
                pageData = hospital.bornCert;
            }
            else {
                this.setData({
                    noData: true,
                    option: userOption
                });
            }
        }

        let hospitalTitle = hospital.alias + userOption;
        this.setData({
            hospitalTitle: hospitalTitle
        });

        optIn.setOptInData(this);
        var actionSvc = new ActionSvc();
        actionSvc.getModalByPageName(this.data.pageName).then(data => {
            this.setData({ xzType: data });
        })

        let arrWarning = pageData.warnings;
        let documents = pageData.documents;
        let title = pageData.titles;
        let arrCard = [];
        let noData = true;
        let url = encodeURI(imgAddress + '/' + option + '/title');
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
                        let url = encodeURI(imgAddress + '/' + option + '/' + pageData.cards[i].images[j]);
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
        let cards = _.clone(this.data.cards);
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
    showTitle: function (e) {
        this.setData({
            showDesc: true,
            showMask: true
        });
    },
    clickDesc: function (e) {
        //勿删
    },
    hideMask: function (e) {
        this.setData({
            showDesc: false,
            showMask: false,
            isXZHid: true,
            'optIn.showError': false
        });
    },
    usefulClick: function (e) {
        //点赞
        optIn.usefulClick(this);
    },
    medalClick: function (e) {
        optIn.medalClick(this);
    },
    errorClick: function (e) {
        optIn.errorClick(this);
    },
    hidAnimat: function () {
        this.setData({
            isXZHid: true,
            showMask: false
        })
    },
    textFocus: function (e) {
        //获得焦点
        optIn.textFocus(this);
    },
    textBlur: function (e) {
        //失去焦点
        optIn.textBlur(this);
    },
    submitErrorInfo: function (e) {
        optIn.submitErrorInfo(this);
    },
    textInput: function(e){
        optIn.textInput(this,e.detail.value);
    }
})
