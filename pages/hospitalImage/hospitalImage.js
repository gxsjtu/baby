const GLOBAL = require('../../global.js');
var col1H = 0;
var col2H = 0;
Page({
    //默认选中的选项选项，0：环境，1：设施，2：病房，4：全部
    data: {
        activeIndex: 0,
        hospitalName: '',
        imgAddress: GLOBAL.SERVER + "/images/",
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        hj: [],
        ss: [],
        bf: [],
        images: [],
        col1: [],
        col2: [],
        previewImage:[]
    },
    onLoad: function(e) {
        wx.showToast({title: '加载中', icon: 'loading', duration: 10000, mask: true});
        this.setData({hospitalName: e.name});

        var pic = getApp().globalData.hospital.imageList;
        if (pic) {
            let hj = pic[0]["环境"];
            let ss = pic[0]["设施"];
            let bf = pic[0]["病房"];

            this.setData({hj: hj, ss: ss, bf: bf})
        }

        wx.getSystemInfo({
            success: (res) => {
                // success
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh - 50;

                this.setData({scrollH: scrollH, imgWidth: imgWidth});
                this.loadImages();
                wx.hideToast();
            },
            fail: () => {
                wx.hideToast();
            }
        })
    },
    changeSegment: function(e) {
        let selectIndex = e.target.dataset.index;
        if (selectIndex) {
            this.setData({activeIndex: selectIndex});
            this.loadImages();
        }
    },
    onImageLoad: function(e) {
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

        let loadingCount = this.data.loadingCount - 1;

        let data = {
            loadingCount: loadingCount
        };

        this.setData(data);

        if (!loadingCount) {
            let col1 = this.data.col1;
            let col2 = this.data.col2;
            for(let i = 0; i<this.data.images.length; i++){
                let img = this.data.images[i];
                if (col1H <= col2H) {
                    col1H += img.height;
                    col1.push(img);
                } else {
                    col2H += img.height;
                    col2.push(img);
                }
            }

            let loadComplete = {
                loadingCount: loadingCount,
                col1: col1,
                col2: col2,
                images:[]
            };
            this.setData(loadComplete);
        }

    },
    showImage:function(e){
        let curr = e.target.dataset.url;
        wx.previewImage({
            current:encodeURI(curr),
            urls:this.data.previewImage,
            success:function(e){
                console.log('s');
                console.log(e);
            },
            fail:function(e){
                console.log('e');
                console.log(e);
            }
        });
    },
    loadImages: function(images) {;
        var images = [];
        var pImages = [];
        if (this.data.activeIndex == 0 || this.data.activeIndex == 3) {
            for (var i = 0; i < this.data.hj.length; i++) {
                var obj = this.data.hj[i];
                images.push({
                    pic: this.data.imgAddress + this.data.hospitalName + '/环境/' + obj.imageID,
                    height: 0,
                    name:obj.imageID
                });
                pImages.push(encodeURI(this.data.imgAddress + this.data.hospitalName + '/环境/' + obj.imageID));
            }
        }
        if (this.data.activeIndex == 1 || this.data.activeIndex == 3) {
            for (var i = 0; i < this.data.ss.length; i++) {
                var obj = this.data.ss[i];
                images.push({
                    pic: this.data.imgAddress + this.data.hospitalName + '/设施/' + obj.imageID,
                    height: 0,
                    name:obj.imageID
                });
                pImages.push(encodeURI(this.data.imgAddress + this.data.hospitalName + '/设施/' + obj.imageID));
            }
        }
        if (this.data.activeIndex == 2 || this.data.activeIndex == 3) {
            for (var i = 0; i < this.data.bf.length; i++) {
                var obj = this.data.bf[i];
                images.push({
                    pic: this.data.imgAddress + this.data.hospitalName + '/病房/' + obj.imageID,
                    height: 0,
                    name:obj.imageID
                });
                pImages.push(encodeURI(this.data.imgAddress + this.data.hospitalName + '/病房/' + obj.imageID));
            }
        }
        debugger;
        let baseId = "img-" + (+ new Date());

        for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
        }
        col1H = 0;
        col2H = 0;
        this.setData({loadingCount: images.length, images: images, col1: [], col2: [], previewImage: pImages});

    }
})
