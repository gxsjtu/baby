const HospitalListSvc = require('../../services/hospitalListSvc.js')
const GLOBAL = require('../../global.js');
const filter = require('../../utils/lodash.filter');
const take = require('../../utils/lodash.take');

Page({
    data: {
        searchArray: [],
        array: [
            "北京", "上海"
        ],
        hosArray: [],
        txt: "地区",
        imgAddress: GLOBAL.SERVER + "/images/"
        // searchKey:""
    },
    bindp: function(e) {
        this.setData({index: e.detail.value})
    },
    onLoad: function() {
        var hospitalSvc = new HospitalListSvc();
        hospitalSvc.getLocation().then(data => {
          var dataList = data.data.data.data;
            this.setData({
                searchArray: dataList, //查询结果
                hosArray: dataList//全部列表
            })
           wx.hideToast();
        }).catch((err) => {
            wx.hideToast();
        });
    },
    searchFunc: function(e) {
        if (e.detail.value == "") {
            this.setData({
                searchArray: this.data.hosArray, //查询结果
            })
        } else {
            var list = [];
            list = filter(this.data.hosArray, function(item) {
                return item.name.indexOf(e.detail.value) >= 0
            })
            this.setData({searchArray: list})
        }
    }

})
