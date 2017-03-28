//app.js
const LoginSvc = require('services/loginSvc');
const UserSvc = require('services/userSvc');
App({
    onLaunch: function (e) {
        this.getUserInfo((userInfo) => {
            //更新数据
            this.globalData.userInfo = userInfo
        })
    },
    getUserInfo: function (cb) {
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
                                // wx.showToast({title:'user'});
                                this.globalData.token = data.data.token;
                                this.globalData.defaultHos = data.data.defaultHos;
                                this.globalData.user = data.data.user;
                                if (this.globalData.fromHos) {
                                    let userSvc = new UserSvc();
                                    userSvc.saveFrom(this.globalData.fromHos);
                                }
                            }).catch(err => {
                                // wx.showToast({title:err.message});
                            });
                            this.globalData.userInfo = res.userInfo;

                            typeof cb == "function" && cb(this.globalData.userInfo)
                        },
                        fail: (err) => {
                            //  wx.showToast({title:'loginerr'});
                        }
                    })
                },
                fail: (err) => {
                    // wx.showToast({title:'err'});
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
        dataList: null, //小卡材料列表
        currentGift: null,//选中的当前礼包
        selectedBuy: null
    }
})
