const BuySvc = require('../../services/buySvc.js');
const GLOBAL = require('../../global.js');
var _ = require('../../utils/lodash.min.js');

Page({
    data: {
        list: [],
        imgAddress: GLOBAL.SERVER + "/images/items/",
        slidesImgAddress: GLOBAL.SERVER + "/images/items/slides/",
        slideImgs: [],
        allList: []
    },
    onLoad: function(e) {
        var buySvc = new BuySvc();

        buySvc.getSlides().then(data => {
            this.setData({slideImgs: data.data.data})
        })

        buySvc.getList().then(data => {
            var dataList = data.data.data;
            var groupList = _.groupBy(dataList, (d) => {
                return d.type;
            });
            var resultList = _.reduce(groupList, (result, items, typeStr) => {
                result.push({items, typeStr});
                return result;
            }, []);
            this.setData({list: resultList, allList: dataList})
        })
    },
    gotoBuyDetail: function(e) {
        var buyId = e.currentTarget.dataset.buyId;
        var buyItem = _.filter(this.data.allList, (item) => {
            return item._id == buyId;
        })

        if (buyItem != null && buyItem != undefined && buyItem.length > 0) {
            getApp().globalData.selectedBuy = buyItem[0];
            wx.navigateTo({url: '../buyDetail/buyDetail'})
        }
    },
    onPullDownRefresh: function() {
        var buySvc = new BuySvc();
        buySvc.getList().then(data => {
            var dataList = data.data.data;
            var groupList = _.groupBy(dataList, (d) => {
                return d.type;
            });
            var resultList = _.reduce(groupList, (result, items, typeStr) => {
                result.push({items, typeStr});
                return result;
            }, []);
            this.setData({list: resultList, allList: dataList});
            wx.stopPullDownRefresh();
        })
    }
})
