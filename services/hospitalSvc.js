const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;

var HospitalSvc = function() {}

HospitalSvc.prototype.getLocation = function() {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude //纬度
                var longitude = res.longitude //经度
                request(GLOBAL.SERVER + "/hospital/getAll/" + longitude + "/" + latitude, null, "GET").then(data => {
                    resolve(data);
                })
            },
            fail: function(err) {
                // reject(err)
                request(GLOBAL.SERVER + "/hospital/getAll/-1/-1", null, "GET").then(data => {
                    resolve(data);
                });
            }
        })
    })
}

HospitalSvc.prototype.getHospitalByID = function(id) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/hospital/getHospitalById/" + id, null, "GET").then(data => {
            resolve(data);
        })
    })
}

HospitalSvc.prototype.setDefaultHospital = function(hosId) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/hospital/setDefaultHospitalById/" + hosId, null, "GET").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
}

module.exports = HospitalSvc;
