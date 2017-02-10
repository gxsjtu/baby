const Promise = require('../utils/promise.min.js');
const lodash = require('../utils/lodash.min.js');
const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;

var LocationSvc = function () {

    this.locations = [
        {
            district: '黄浦区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '徐汇区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '长宁区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '静安区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '宝山区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '浦东新区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '虹口区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '闸北区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '松江区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '金山区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '奉贤区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '青浦区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '崇明县',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }
    ];
};

LocationSvc.prototype.getDistricts = function () {
    return new Promise((resolve, reject) => {
        var d = [];
        lodash.forEach(this.locations, x => {
            d.push(x.district);
        });
        resolve(d);
    });
};

LocationSvc.prototype.getStreetsByDistrict = function (district) {
    return new Promise((resolve, reject) => {
        var target = _.find(this.locations, x => {
            return x.district === district;
        });
        resolve(target);
    });
};

LocationSvc.prototype.getCurrentLocation = function () {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude //纬度
                var longitude = res.longitude //经度
                  request(GLOBAL.SERVER + "/user/getLocation/" + longitude + "/" + latitude, null, "GET").then(data => {
                    resolve(data);
                })
            },
            fail: function(err) {
                // reject(err)
                // request(GLOBAL.SERVER + "/hospital/getAll/-1/-1", null, "GET").then(data => {
                //     resolve(data);
                // });
                console.log("拒绝")
            }
        })
    })
}

module.exports = LocationSvc;
