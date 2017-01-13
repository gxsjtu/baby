const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request

var HospitalListSvc = function (){

}

HospitalListSvc.prototype.getHospitalList = function (){
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/hospital/getAll/全部/全部", '' ,"GET").then(data => {
            resolve(data)
        })
    })
}

HospitalListSvc.prototype.getLocation = function (){
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude //纬度
                var longitude = res.longitude //经度
                request(GLOBAL.SERVER + "/hospital/getAll/全部/全部?lng=" + longitude + "&lat=" + latitude, '' ,"GET").then(data => {
                    resolve(data)
                 })
            },
            fail: function(err) {
                console.log('geterr')
                // reject(err)
            }
        })
    })
}

module.exports = HospitalListSvc;