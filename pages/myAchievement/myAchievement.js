const ActionSvc = require("../../services/actionSvc.js");

Page({
    data: {
        viewWidth: "",//勋章图片的宽度跟外层view的宽度
        imgHeight: "0px",
        imgWidth: "",//背景书架的宽
        avgHeight: "",
        xzHeight: "",
        xzList: ["aaa", "vbb", "ccc", "fff", "eee", "gghh", "fff", "eee", "gghh", "aaa", "vbb", "ccc", "fff", "eee", "gghh", "gghh", "aaa", "vbb", "ccc", "fff"],
        topList: [],
        otherList: [],
        xzBottom: ""
    },
    onLoad: function (e) {

    },
    getHeight: function (e) {
        wx.getSystemInfo({
            success: (res) => {
                // success
                var windowWidth = res.windowWidth;
                var viewW = parseInt(windowWidth / 3);
                var actionSvc = new ActionSvc();

                let modals = getApp().globalData.user.modals;
                var topArray = [];
                var otherArray = [];
                var avgH = (parseInt(e.detail.height / 7) - 10) + "px";


                var forBottom = parseInt(parseInt(viewW / 1.6) / 2) - 10;
                this.setData({
                    imgHeight: e.detail.height + "px",
                    imgWidth: windowWidth + "px",
                    avgHeight: avgH,
                    viewWidth: viewW + "px",
                    xzBottom: forBottom + "px"
                })
                for (var i = 0; i < modals.length; i++) {
                    if (i < 3) {
                        actionSvc.getModalByPageName(modals[i]).then(data => {
                            topArray.push(data);
                            this.setData({
                                topList: topArray
                            })
                        });
                    }
                    else {
                        actionSvc.getModalByPageName(modals[i]).then(data => {
                            otherArray.push(data);
                            this.setData({
                                otherList: otherArray
                            })
                        });
                    }
                }
            }
        })


    }
})