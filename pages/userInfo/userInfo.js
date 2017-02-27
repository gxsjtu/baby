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
        if (globalData.user.preBorn) {
            this.setData({
                confinementDate: globalData.user.preBorn
            });
        }
        if (globalData.user.address && globalData.user.address.juZhu) {
            let juzhu = globalData.user.address.juZhu;
            this.setData({
                currentAddress: juzhu.detail
            });
        }
        if (globalData.user.address && globalData.user.address.huJi) {
            let huJi = globalData.user.address.huJi;
            this.setData({
                census: huJi.detail
            });
        }
        if (globalData.user.deliveryAddress) {
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