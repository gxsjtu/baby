const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;
const Promise = require('../utils/promise.min.js');

var ConfinementDateSvc = function () { }

ConfinementDateSvc.prototype.getBorn = function (last, average) {
    return new Promise((resolve, reject) => {
        request(GLOBAL.SERVER + "/hospital/calculateBorn/" + last + "/" + average, null, "GET").then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        });
    })
}

module.exports = ConfinementDateSvc;
