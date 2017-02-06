const GLOBAL = require('../global.js');
const Promise = require('../utils/promise.min.js');
function LoginSvc(){

}

LoginSvc.prototype.login = function (code, res) {
  return new Promise((resolve, reject) => {
     wx.request({
        url: GLOBAL.SERVER + "/login",
        data: {code: code, data: res},
        header: {
          'content-type': 'application/json'
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(data){
          // success
          resolve(data.data)
        },
        fail: function(err) {
          // fail
        },
        complete: function() {
          // complete
        }
    })
  })
};

module.exports = LoginSvc;
