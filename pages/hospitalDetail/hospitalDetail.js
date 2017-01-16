const HospitalListSvc = require('../../services/hospitalListSvc.js')

Page({
    data: {
        hospital: {}
        // telArray: {name:"}
    },
    callTel: function(e){
        var telArray = ["拨号"];
        telArray.push("lll");
        wx.showActionSheet({
            itemList:telArray,
            success: function(res) {

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
        id="58046c7a89f15b21e09e2a24";
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000, mask: true });
        var hospitalSvc = new HospitalListSvc();
        hospitalSvc.getHospitalByID(id).then(data => {
            console.log(data)
            this.setData({
                hospital: data.data.data
            })
            wx.hideToast();
        }).catch(() => {
            wx.hideToast();
        })
    }
})