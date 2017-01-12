const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request

var HospitalListSvc = function (){

}

HospitalListSvc.prototype.getHospitalList = function(){
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/hospital/getAll/全部/全部", 'aaa' ,"GET").then(data => {

        })
    })
}

module.exports = HospitalListSvc;