const GLOBAL = require('../../global.js');

Page({
    data:{
        imgAddress: GLOBAL.SERVER + "/images/"
    },
    call: function (e) {
        let phone = e.target.dataset.phone;
        if (phone) {
            wx.makePhoneCall({
                phoneNumber: phone, success: function (res) {
                    // success
                }
            })
        }
    }
})