const GLOBAL = require('../../global.js');

Page({
    data: {
        rooms: [],
        hospital: {},
        imgAddress: GLOBAL.SERVER + "/images/",
        noData: false
    },
    onLoad: function () {
        var app = getApp();
        let rooms = app.globalData.hospital.rooms;
        let noData = true;
        if (rooms && rooms.length > 0) {
            noData = false;
            this.setData({
                hospital: app.globalData.hospital,
                rooms: rooms,
                noData: noData
            })
        }
        else {
            this.setData({
                hospital: app.globalData.hospital,
                noData: true
            })
        }


    }
})