const HospitalListSvc = require('../../services/hospitalListSvc.js')
const GLOBAL = require('../../global.js');

Page({
    data: {
        searchArray: [],
        array: ["北京", "上海"],
        hosArray: [],
        txt: "地区",
        imgAddress: GLOBAL.SERVER + "/images/",
        searchKey:""
    },
    bindp: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    onLoad: function () {
        var hospitalSvc = new HospitalListSvc()
        hospitalSvc.getLocation().then(data => {
            this.setData({
                searchArray: data.data.data,//查询结果
                hosArray:data.data.data //全部列表
            })
        })
    },
    searchFunc: function(e){
        var list = [];
        for(var i = 0; i < this.data.hosArray.length; i++){
            if(this.data.hosArray[i] != null){
                if(this.data.hosArray[i].name.indexOf(e.detail.value) > 0){
                    list.push(this.data.hosArray[i])
                }
            }
        }
        this.setData({
            searchArray: list
        })
    }

})
