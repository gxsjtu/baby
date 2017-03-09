const BuySvc = require('../../services/buySvc.js');
const GLOBAL = require('../../global.js');
var _ = require('../../utils/lodash.min.js');

Page({
  data: {
    list: [],
    imgAddress: GLOBAL.SERVER + "/images/items/"
  },
  onLoad: function (e) {
    var buySvc = new BuySvc();
    buySvc.getList().then(data => {
      // console.log(data.data.data);
      this.setData({
        list: data.data.data
      })
    })
  },
  gotoBuyDetail: function (e) {
    var buyId = e.currentTarget.dataset.buyId;
    var buyItem = _.filter(this.data.list, (item) => {
      return item._id == buyId;
    })

    if (buyItem != null && buyItem != undefined && buyItem.length > 0) {
      getApp().globalData.selectedBuy = buyItem[0];
      console.log(getApp().globalData.selectedBuy);
      wx.navigateTo({
        url: '../buyDetail/buyDetail'
      })
    }
  }
})