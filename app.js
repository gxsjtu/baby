//app.js
const LoginSvc = require('services/loginSvc');
App({
    onLaunch: function() {
        this.getUserInfo((userInfo) => {
            //更新数据
            this.globalData.userInfo = userInfo
        })
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
                            loginSvc.login(info.code, res).then(data => {
                                this.globalData.token = data.data.token;
                                this.globalData.defaultHos = data.data.defaultHos;
                                this.globalData.user = data.data.user;
                            });
                            this.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(this.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null,
        token: null,
        defaultHos: null,
        hospital: null,
        user: null,
        resultStreets: null,
        dataList: null //小卡材料列表
    }
})
