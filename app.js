//app.js
const LoginSvc = require('services/loginSvc');
App({
    onLaunch: function() {

    },
    getUserInfo: function(cb) {
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: (info) => {
                    wx.getUserInfo({
                        success: (res) => {
                            //申请sessionkey和openid
                            let loginSvc = new LoginSvc();
                            loginSvc.login(info.code, res.userInfo);
                            this.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(this.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})
