const gloabl = require('../global');

function LoginSvc(){

}

LoginSvc.prototype.login = function (code, res) {
  console.log(gloabl.SERVER);
  return new Promise((resolve, reject) => {
     wx.request({
        url: gloabl.SERVER + "/login",
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
          console.log('com')
        }
    })
  })
};

module.exports = LoginSvc;
