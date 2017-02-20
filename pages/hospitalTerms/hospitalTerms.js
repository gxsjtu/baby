Page({
    data: {
        terms: [],
        showAlert: false,
        alert: {
            title: '',
            comments: []
        }
    },
    onLoad: function () {
        var app = getApp();
        this.setData({
            terms: app.globalData.hospital.terms
        })
    },
    clickMask: function (e) {
        this.setData({
            showAlert: false
        });
    },
    clickAlert: function (e) {

    },
    showAlert: function (e) {
        console.log(e);
        let item = e.currentTarget.dataset.term;
        if (item.isHas) {
            this.setData({
                showAlert: true,
                'alert.title':item.name,
                'alert.comments':item.comments
            });
        }
    }
})