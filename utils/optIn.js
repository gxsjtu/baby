const ActionSvc = require('../services/actionSvc.js');
var _ = require('lodash.min.js');
function setOptInData(_this) {
    //确定点赞、领取勋章和纠错哪个能用
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

    }
}

function errorClick(_this) {
    if (_this.data.optIn.enable[2]) {
        _this.setData({
            showMask:true,
            'optIn.showError':true
        });
    }
}

function confirmInfo(_this){

}

module.exports = {
    setOptInData: setOptInData,
    usefulClick: usefulClick,
    medalClick: medalClick,
    errorClick: errorClick,
    confirmInfo:confirmInfo
}