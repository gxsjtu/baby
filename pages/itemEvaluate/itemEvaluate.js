const GLOBAL = require('../../global.js');
const ItemEvaluateSvc = require('../../services/itemEvaluateSvc.js');

Page({
    data: {
        scrollHeight: '',
        showMask: false,
        selectIndex: 0,
        itemId: '',
        avatar: '',
        rates: ['red', 'red', 'red', 'red', 'red'],
        currentRates: 5,
        message: '',
        nickName: '',
        bottom: 0,
        goodCount: 0,
        middleCount: 0,
        badCount: 0,
        allCount: 0,
        platform: 'ios',
        evaluates: []
    },
    onLoad: function (e) {
        console.log(e.canGetBundle);
        wx.getSystemInfo({
            success: (res) => {
                var h = res.windowHeight - 52;
                this.setData({
                    scrollHeight: h + "px",
                    platform: res.platform
                })
            }
        });

        let globalData = getApp().globalData;
        let itemId = globalData.currentGift._id;
        let nickName = globalData.userInfo.nickName;
        let avatarUrl = globalData.userInfo.avatarUrl;
        let imgAddress = GLOBAL.SERVER + "/images/bundles/" + e.bundleId;
        let item = globalData.currentGift;
        let avatar = encodeURI(imgAddress + '/' + item.name + '/' + item.name);
        this.data.itemId = itemId;
        this.data.nickName = nickName;
        this.data.avatarUrl = avatarUrl;
        this.setData({
            avatar: avatar,
            gift: item,
            canAdd: e.canGetBundle == 'false' ? true : false
        });
        var itemEvaluateSvc = new ItemEvaluateSvc();
        itemEvaluateSvc.getJudgesByItemId(itemId).then((data) => {
            console.log(data);
            let evaluates = [];
            let allEvaluates = [];
            let goodEvaluates = [];
            let middleEvaluates = [];
            let badEvaluates = [];
            let objs = data.data.data;
            for (let i = 0; i < objs.length; i++) {
                let obj = {};
                obj.alias = objs[i].alias;
                obj.created = objs[i].created;
                obj.avatarUrl = objs[i].avatar;
                obj.message = objs[i].message;
                if (objs[i].score == 1) {
                    obj.score = ['red', 'grey', 'grey', 'grey', 'grey'];
                    badEvaluates.push(obj);
                }
                else if (objs[i].score == 2) {
                    obj.score = ['red', 'red', 'grey', 'grey', 'grey'];
                    middleEvaluates.push(obj);
                }
                else if (objs[i].score == 3) {
                    obj.score = ['red', 'red', 'red', 'grey', 'grey'];
                    middleEvaluates.push(obj);
                }
                else if (objs[i].score == 4) {
                    obj.score = ['red', 'red', 'red', 'red', 'grey'];
                    goodEvaluates.push(obj);
                }
                else if (objs[i].score == 5) {
                    obj.score = ['red', 'red', 'red', 'red', 'red'];
                    goodEvaluates.push(obj);
                }
                allEvaluates.push(obj);
            }
            this.data.allEvaluates = allEvaluates;
            this.data.goodEvaluates = goodEvaluates;
            this.data.middleEvaluates = middleEvaluates;
            this.data.badEvaluates = badEvaluates;
            this.setData({
                evaluates: allEvaluates,
                allCount: allEvaluates.length,
                goodCount: goodEvaluates.length,
                middleCount: middleEvaluates.length,
                badCount: badEvaluates.length
            });
        });
    },
    add: function () {
        this.setData({
            showMask: true
        })
    },
    hideMask: function () {
        this.setData({
            showMask: false,
            message: '',
            rates: ['red', 'red', 'red', 'red', 'red'],
            currentRates: 5
        })
    },
    selectTab: function (e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            selectIndex: index
        });
        if (index == 0) {
            this.setData({
                evaluates: this.data.allEvaluates
            })
        }
        else if (index == 1) {
            this.setData({
                evaluates: this.data.goodEvaluates
            })
        }
        else if (index == 2) {
            this.setData({
                evaluates: this.data.middleEvaluates
            })
        }
        else if (index == 3) {
            this.setData({
                evaluates: this.data.badEvaluates
            })
        }
    },
    containerClick: function (e) {

    },
    textFocus: function (e) {
        //获得焦点
        if (this.data.platform == 'ios') {
            this.setData({
                bottom: 200
            });
        }
        else if (this.data.platform == 'android') {
            this.setData({
                bottom: 0
            });
        }
    },
    textBlur: function (e) {
        //失去焦点
        this.setData({
            bottom: 0
        });
    },
    textInput: function (e) {
        this.setData({
            message: e.detail.value
        });
    },
    rate: function (e) {
        let rate = e.currentTarget.dataset.rate;
        this.data.currentRates = rate;
        if (rate == 1) {
            this.setData({
                rates: ['red', 'grey', 'grey', 'grey', 'grey'],
            })
        }
        else if (rate == 2) {
            this.setData({
                rates: ['red', 'red', 'grey', 'grey', 'grey']
            })
        }
        else if (rate == 3) {
            this.setData({
                rates: ['red', 'red', 'red', 'grey', 'grey']
            })
        }
        else if (rate == 4) {
            this.setData({
                rates: ['red', 'red', 'red', 'red', 'grey']
            })
        }
        else if (rate == 5) {
            this.setData({
                rates: ['red', 'red', 'red', 'red', 'red']
            })
        }
    },
    submitEvaluate: function () {
        if (this.data.message) {
            var itemEvaluateSvc = new ItemEvaluateSvc();
            itemEvaluateSvc.addJudge(this.data.itemId, this.data.nickName, this.data.message, this.data.currentRates, this.data.avatarUrl).then((data) => {
                console.log(data);
                this.hideMask();
            });
        }
    }
})