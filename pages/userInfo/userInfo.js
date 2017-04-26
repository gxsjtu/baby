const UserSvc = require('../../services/userSvc.js');
Page({
    data: {
        btnDisabled: false,
        confinementDate: '',
        phone: '',
        census: '',
        currentAddress: '',
        hospitalName: '',
        doctor: '',
        start:'',
        end:'',
        loading: false,
        disabled: false
    },
    onLoad: function (e) {
        console.log(getApp().globalData.user.preBorn);
        let globalData = getApp().globalData;
        if (!globalData.hospital) {
            globalData.hospital = globalData.defaultHos;
        }
        this.setData({ userInfo: globalData.userInfo });
        if (globalData.hospital) {
            this.setData({
                hospitalName: globalData.hospital.name
            });
        }
        if (globalData.user.preBorn!=undefined) {
            let Date = globalData.user.preBorn;
            let year = Number(Date.substr(0,4));
            
            this.setData({
                confinementDate: globalData.user.preBorn,
                start:(year-2)+'-01-01',
                end:(year+2)+'-12-31'
            });
        }
        else{
            let year = new Date().getFullYear();
            this.setData({
                start:(year-2)+'-01-01',
                end:(year+2)+'-12-31'
            })
        }
        if (globalData.user.address!=undefined && globalData.user.address.juZhu!=undefined) {
            let juzhu = globalData.user.address.juZhu;
            this.setData({
                currentAddress: juzhu.detail
            });
        }
        if (globalData.user.address!=undefined && globalData.user.address.huJi!=undefined) {
            let huJi = globalData.user.address.huJi;
            this.setData({
                census: huJi.detail
            });
        }
        if (globalData.user.deliveryAddress!=undefined) {
            this.setData({ phone: globalData.user.deliveryAddress.tel });
        }
    },
    saveInfo: function (e) {

    },
    bindDateChange: function(e) {
        this.setData({
            confinementDate: e.detail.value
        })
    },
    setPhone: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    setCensus: function (e) {

    },
    setCurrentAddress: function (e) {

    },
    save:function(e){
        var userSvc = new UserSvc();
        let info = {
            preborn: this.data.confinementDate
        };
        userSvc.saveUserInfo(info).then((data)=>{
            console.log(data.data.message);
            if(data.data.message == 'OK')
            {
                wx.showToast({title: '保存成功'});
                getApp().globalData.user.preBorn = this.data.confinementDate;
                console.log(getApp().globalData.user.preBorn);
            }  
            else
                wx.showToast({title: '保存失败'});
        });
    }
})