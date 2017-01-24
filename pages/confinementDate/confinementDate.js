const ConfinementDateSvc = require('../../services/confinementDateSvc.js')

Page({
    data: {
        showResult: false,
        averageIndex: 8,
        year: '',
        month: '',
        date: '',
        preBorn: '',
        week: '',
        fromNow: '',
        start: '',
        end: '',
        selectDate: '',
        btnChecking: false,
        averageArr: [
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45
        ]
    },
    onLoad: function (e) {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let start = (year - 1) + '-01-01';
        let end = (year + 1) + '-12-31';
        let selectDate = year + (month < 10
            ? '-0' + month
            : '-' + month) + (date < 10
                ? '-0' + date
                : '-' + date);
        this.setData({
            start: start,
            end: end,
            year: year,
            month: month,
            date: date,
            selectDate: selectDate,
            average: this.data.averageArr[8]
        });
    },
    check: function (e) {
        this.setData({
            btnChecking: true
        });
        let last = this.data.selectDate;
        var confinementDateSvc = new ConfinementDateSvc();
        confinementDateSvc.getBorn(last, this.data.average).then(data => {
            if (data.data.status == 0) {
                let preBorn = data.data.data.preBorn;
                let fromNow = data.data.data.fromNow;
                let week = data.data.data.week;
                this.setData({ preBorn: preBorn, fromNow: fromNow, week: week, showResult: true, btnChecking: false });
            } else {
                this.setData({ showResult: false, btnChecking: false });
                wx.showToast({ title: data.data.message, duration: 3000 })
            }

        }).catch((err) => {
            this.setData({
                btnChecking: false
            });
        });
    },
    hiddenMask: function (e) {
        this.setData({ showResult: false });
    },
    changeDate: function (e) {
        let select = e.detail.value;
        let arr = select.split('-');
        this.setData({ year: arr[0], month: arr[1], date: arr[2], selectDate: select });
    },
    changeAverage: function (e) {
        console.log(e.detail.value);
        console.log(this.data.averageArr[e.detail.value]);
        let index = e.detail.value;
        this.setData({ averageIndex: index, average: this.data.averageArr[index] });
    }
})
