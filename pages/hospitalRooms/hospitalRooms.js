const GLOBAL = require('../../global.js');

Page({
    data: {
        rooms: [],
        hospital: {},
        imgAddress: GLOBAL.SERVER + "/images/",
    },
    onLoad: function () {
        var app = getApp();
        this.setData({
            hospital: app.globalData.hospital,
            rooms: app.globalData.hospital.rooms
        })
        console.log('hos')
        console.log(app.globalData.hospital);
        // this.setData({
        //     rooms: app.globalData.hospital.rooms
        // })
    }
})