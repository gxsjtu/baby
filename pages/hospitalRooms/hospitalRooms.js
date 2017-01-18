
Page({
    data:{
        rooms:[]
    },
    onLoad: function(){
         var app = getApp();
        this.setData({
            rooms: app.globalData.hospital.rooms
        })
    }
})