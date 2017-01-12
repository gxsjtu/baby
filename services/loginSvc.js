const gloabl = require('../global');

function LoginSvc(){

}

LoginSvc.prototype.login = function (code, userInfo) {
  console.log(gloabl.SERVER);
  wx.request({
    url: "https://nicebaby.shtx.com.cn/login",
    data: {code: code, data: userInfo},
    header: {
      'content-type': 'application/json'
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
      console.log('loginres')
      console.log(res)
    },
    fail: function(err) { 
      console.log('fail')
      console.log(err);
      // fail
    },
    complete: function() {
      // complete
      console.log('com')
    }
  })
};

module.exports = LoginSvc;
