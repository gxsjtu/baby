Page({
    data: {
        streets: [],
        ishid: false,
        delta: "",
        pageId: ""
    },
    onLoad: function (e) {
        let globalData = getApp().globalData;

        this.data.delta = e.delta;
        var pId = e.pageId;
        this.data.pageId = pId;

        if (pId == 'birth') {
            wx.setNavigationBarTitle({
                title: '申请生育保险总结'
            });
            this.setData({
                title: '申请生育保险总结',
                needs: globalData.dataList
            });
        }
        else if (pId == 'lessCard') {
            wx.setNavigationBarTitle({
                title: '办理小卡总结'
            });
            if (e.type == "1") {
                this.setData({
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证','早期检查单']
                });
            }
            else {
                this.setData({
                    title: '办理小卡总结',
                    needs: ['夫妻双方身份证', '夫妻双方户口本', '夫妻双方结婚证','早期检查单','居住证及复印件(正反面)或租房合同']
                });
            }


        }

        if (e.type == "1") {
            var ss = globalData.resultStreets;
            if (ss == null || ss == undefined || ss.length <= 0) {
                this.setData({
                    ishid: true
                })
            }
            else {
                this.setData({
                    streets: globalData.resultStreets
                })
            }
        } else {
            this.setData({
                ishid: true
            })
        }
    },
    goBack: function () {
        //    wx.navigateTo({ url: '../index/index' });
        if (this.data.delta == "y") {
            wx.navigateBack({ delta: 4 });
        }
        else {
            wx.navigateBack({ delta: 3 });
        }
    }
})