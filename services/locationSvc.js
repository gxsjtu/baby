const Promise = require('../utils/promise.min.js');
const lodash = require('../utils/lodash.min.js');

var LocationSvc = function() {

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
        }
    ];
};

LocationSvc.prototype.getDistricts = function() {
    return new Promise((resolve, reject) => {
        var d = [];
        lodash.forEach(this.locations, x => {
            d.push(x.district);
        });
        resolve(d);
    });
};

LocationSvc.prototype.getStreetsByDistrict = function(district) {
    return new Promise((resolve, reject) => {
        var target = _.find(this.locations, x => {
            return x.district === district;
        });
        resolve(target);
    });
};

module.exports = LocationSvc;
