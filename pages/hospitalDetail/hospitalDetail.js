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
                var telStr = telArray[res.tapIndex];
                var idx = telStr.indexOf("：");
                var tel = telStr.substring(idx + 1);
                wx.makePhoneCall({
                  phoneNumber: tel,
                  success: function(res) {
                    // success
                  }
                })
            },
            fail: function(res) {

            }
        })
    },
    onLoad: function (e) {
        //获取窗口高度
        wx.getSystemInfo({
          success: (res) => {
            // success
            var h = (res.windowHeight - 55 - 1 - 2 - 2);
            console.log(h);
            this.setData({
                scrollHeight: (h) + "px"
            }) 
          }
        })

        var id = e.id;
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000, mask: true });
        var hospitalSvc = new HospitalListSvc();
        hospitalSvc.getHospitalByID(id).then(data => {
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