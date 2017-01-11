const gloabl = require('../global');

function LoginSvc(){

}

LoginSvc.prototype.login = function (code, userInfo) {
  console.log(gloabl.SERVER);
};

module.exports = LoginSvc;
