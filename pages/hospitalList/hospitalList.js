const HospitalListSvc = require('../../services/hospitalListSvc.js')
const GLOBAL = require('../../global.js');

Page({
    data:{
        array:["北京","上海"],
        hosArray:[],
        txt: "地区",
        imgAddress: GLOBAL.SERVER + "/images/",
    },
    bindp: function(e){
        this.setData({
            index: e.detail.value
        })
    },
    onLoad: function(){
        var hospitalSvc = new HospitalListSvc()
        hospitalSvc.getLocation().then(data => {
            this.setData({
                hosArray: data.data.data
            })
        })
    }

})
