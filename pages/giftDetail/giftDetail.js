const GLOBAL = require('../../global.js');

Page({
    data: {
        logo: '',
        description: '',
        details: [],
        recommends: [],
        discounts: [],
        experiences: [],
        images: [],
        imgWidth: 0
    },
    onLoad: function (e) {
        console.log(getApp().globalData.currentGift);

        let gift = getApp().globalData.currentGift;
        let baseImgAddress = GLOBAL.SERVER + "/images/bundles/" + e.bundleId + "/" + gift.name + "/";
        let imgAddress = baseImgAddress + "logo";
        let description = gift.description;
        let details = [];
        if (gift.details)
            details = gift.details;
        let recommends = [];
        if (gift.recommends)
            recommends = gift.recommends;
        let experiences = [];
        if (gift.experiences)
            experiences = gift.experiences;
        let discounts = [];

        wx.getSystemInfo({
            success: (res) => {
                this.setData({ imgWidth: res.windowWidth });
                let images = [];
                let baseId = "img-" + (+ new Date());
                for (let i = 0; i < gift.images.length; i++) {
                    let imageObj = { height: 0 };

                    imageObj.imageUrl = baseImgAddress + gift.images[i];
                    imageObj.id = baseId + "-" + i;
                    images.push(imageObj);
                }
                this.loadImages(images);
            }
        })

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

        // let images = [];
        // let baseId = "img-" + (+ new Date());
        // for (let i = 0; i < gift.images.length; i++) {
        //     let imageObj = { height: 0 };

        //     imageObj.imageUrl = gift.images[i];
        //     imageObj.id = baseId + "-" + i;
        //     images.push(imageObj);
        // }

        this.setData({
            description: description,
            details: details,
            logo: imgAddress,
            recommends: recommends,
            discounts: discounts,
            experiences: experiences,
            // images: images
        })

    },
    onImageLoad: function (e) {

        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; //比例计算
        let imgHeight = oImgH * scale; //自适应高度
        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }

        imageObj.height = imgHeight;

        this.setData({
            images: images
        });

    },
    loadImages: function (images) {
        this.setData({
            images: images
        });
    }
})