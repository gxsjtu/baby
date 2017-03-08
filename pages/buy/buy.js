const BuySvc = require('../../services/buySvc.js');
const GLOBAL = require('../../global.js');

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
  gotoBuyDetail: function(){
    wx.navigateTo({
      url: '../buyDetail/buyDetail'
    })
  }
})