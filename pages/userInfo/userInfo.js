Page({
    data: {
        btnDisabled: false,
        confinementDate: '',
        phone: '',
        census: '',
        currentAddress: '',
        hospitalName: '',
        doctor: ''
    },
    onLoad: function (e) {
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
            this.setData({
                confinementDate: globalData.user.preBorn
            });
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
    setConfinementDate: function (e) {

    },
    setPhone: function (e) {

    },
    setCensus: function (e) {

    },
    setCurrentAddress: function (e) {

    }
})