const HospitalListSvc = require('../../services/hospitalListSvc.js')
const GLOBAL = require('../../global.js');

Page({
    data: {
        hasHos: false,
        hospital: {},
        imgAddress: GLOBAL.SERVER + "/images/",
        imgSrc: "#"
    },
    callTel: function(e){
        var hos = this.data.hospital.tel;
        var telArray = ["拨号"];
        telArray.push(hos.main.name + "：" + hos.main.number);
        for(var i = 0; i < hos.others.length; i++){
            telArray.push(hos.others[i].name + "：" + hos.others[i].number);
        }
        wx.showActionSheet({
            itemList:telArray,
            success: function(res) {
                console.log('res');
                console.log(res);
                var telStr = telArray[res.tapIndex];
                var idx = telStr.indexOf("：");
                var tel = telStr.substring(idx + 1);
                wx.makePhoneCall({
                  phoneNumber: tel,
                  success: function(res) {
                    // success
                  }
                })
                console.log(tel);
            },
            fail: function(res) {

            }
        })
        // wx.makePhoneCall({
        //   phoneNumber: e.currentTarget.dataset.,
        //   success: function(res) {
        //     // success
        //   }
        // })
    },
    onLoad: function (e) {
        var id = e.id;
        id="58046c7a89f15b21e09e2a28";
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000, mask: true });
        var hospitalSvc = new HospitalListSvc();
        hospitalSvc.getHospitalByID(id).then(data => {
            console.log(data)
            this.setData({
                hospital: data.data.data,
                hasHos: true
            })
            wx.hideToast();
        }).catch(() => {
            wx.hideToast();
        })
    }
})