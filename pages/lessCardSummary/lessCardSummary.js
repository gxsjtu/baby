Page({
    data: {
        streets: [],
        ishid: false,
        delta: "",
        pageId: "",
        bsHidden: true,
        jcHidden: true,
        yyHidden: true
    },
    onLoad: function (e) {
        let globalData = getApp().globalData;

        this.data.delta = e.delta;
        var pId = e.pageId;
        this.data.pageId = pId;
        var fromStr = e.fromStr;

        if (pId == 'birth') {
            wx.setNavigationBarTitle({ title: '申请生育保险小结' });
            this.setData({ title: '申请生育保险小结', needs: globalData.dataList });
        } else if (pId == 'lessCard') {
            wx.setNavigationBarTitle({ title: '办理小卡总结' });
            if (e.type == "1") {
                this.setData({
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证', '早期检查单（医院开具或现场检查）']
                });
            } else {
                this.setData({
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证', '早期检查单（医院开具或现场检查）', '居住证及复印件(正反面)或租房合同']
                });
            }

        }

        var ss = globalData.resultStreets;
        if (ss == null || ss == undefined || ss.length <= 0) {
            this.setData({ ishid: true, jcHidden: true, bsHidden: true, yyHidden: true  })
        } else {
            if (fromStr == "1") {
                this.setData({ jcHidden: true, bsHidden: true, yyHidden: false })
            } else if (fromStr == "2") {
                this.setData({ jcHidden: false, bsHidden: true, yyHidden: true })
            } else if (fromStr == "3") {
                this.setData({ jcHidden: true, bsHidden: false, yyHidden: true })
            }
            this.setData({ streets: globalData.resultStreets })
        }


    },
    goBack: function () {
        if (this.data.delta == "y") {
            wx.navigateBack({ delta: 4 });
        } else {
            wx.navigateBack({ delta: 3 });
        }
    }
})
