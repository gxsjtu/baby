const ActionSvc = require('../services/actionSvc.js');
var _ = require('lodash.min.js');
function setOptInData(_this) {
    //确定点赞、领取勋章和纠错哪个能用
    let modals = getApp().globalData.user.modals;
    var modal = _.filter(modals, (m) => {
        return m == _this.data.pageName;
    })
    if (modal != null && modal != undefined && modal.length > 0) {
        _this.setData({
            "optIn.enable[1]": false
        })
    }

    var actionSvc = new ActionSvc();
    actionSvc.goodsCount(_this.data.hospitalId, _this.data.pageName).then((data) => {
        _this.setData({
            'optIn.num': (data.data.data ? data.data.data : 0)
        });
        let goods = getApp().globalData.user.goods;
        let good = _.find(goods, { hospitalId: _this.data.hospitalId, pageId: _this.data.pageName });
        if (good) {
            //已点过赞
            _this.setData({
                'optIn.enable[0]': false
            });
        }
        else {
            _this.setData({
                'optIn.enable[0]': true
            });
        }
    });
}

function usefulClick(_this) {
    //点赞
    if (_this.data.optIn.enable[0]) {
        var actionSvc = new ActionSvc();
        actionSvc.clickGood(_this.data.hospitalId, _this.data.pageName).then((data) => {
            if (data.data.message == 'OK') {
                _this.setData({
                    'optIn.enable[0]': false,
                    'optIn.num': _this.data.optIn.num + 1
                });
                //更新globalData
                let goods = getApp().globalData.user.goods;
                let good = { hospitalId: _this.data.hospitalId, pageId: _this.data.pageName };
                goods.push(good);
            }
        });
    }
}

function medalClick(_this) {

    if (_this.data.optIn.enable[1]) {
        var animationStart = wx.createAnimation({
            duration: 200,
            timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
            delay: 0,
            transformOrigin: '50% 50% 0'
        })

        animationStart.scale(0, 0).opacity(0).step();
        _this.setData({
            animationData: animationStart.export(),
            isXZHid: false,
            showMask: true
        })
        setTimeout(() => {
            var animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
                delay: 0
            })

            animation.scale(1, 1).opacity(1).step();
            _this.setData({
                animationData: animation.export()
            })
        }, 300)

        var actionSvc = new ActionSvc();
        actionSvc.getModal(_this.data.pageName).then(data => {
            if (data.data.message == 'OK') {
                getApp().globalData.user.modals.push(_this.data.pageName);
                _this.setData({
                    'optIn.enable[1]': false
                });
            }
        })


    }
}

function errorClick(_this) {
    if (_this.data.optIn.enable[2]) {
        _this.setData({
            showMask: true,
            'optIn.showError': true
        });
    }
}

function confirmInfo(_this, inputValue) {
    _this.setData({
        showMask: false,
        'optIn.showError': false
    });
    if (inputValue) {
        console.log('beigin');
        var actionSvc = new ActionSvc();
        actionSvc.giveCorrection(_this.data.hospitalId, _this.data.pageName, inputValue).then(data => {
            console.log(data);
        })
    }
}

module.exports = {
    setOptInData: setOptInData,
    usefulClick: usefulClick,
    medalClick: medalClick,
    errorClick: errorClick,
    confirmInfo: confirmInfo
}