const HospitalListSvc = require('../../services/hospitalListSvc.js')

Page({
    data:{
        array:["2","3","2","3","2","3","2","3"],
        txt: "地区"
    },
    bindp: function(e){
        console.log(this.data.array)
        this.setData({
            index: e.detail.value
            // txt: this.data.array[e.detail.value]
        })
    },
    onLoad: function(){
        var hospitalSvc = new HospitalListSvc()
        hospitalSvc.getHospitalList().then(data => {

        })
    } 
    
})
