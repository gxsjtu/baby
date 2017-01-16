const HospitalListSvc = require('../../services/hospitalListSvc.js')

Page({
    data: {
        // hospital: { name: "", address: "", description: "", level: "" }
    },
    onLoad: function (e) {
        var id = e.id;
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000, mask: true });
        var hospitalSvc = new HospitalListSvc();
        hospitalSvc.getHospitalByID(id).then(data => {
            this.setData({
                hospital: data.data.data
            })
            wx.hideToast();
        }).catch(() => {
            wx.hideToast();
        })
    }
})