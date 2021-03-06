const HospitalSvc = require('../../services/hospitalSvc.js')
const GLOBAL = require('../../global.js');
// const filter = require('../../utils/lodash.filter');
// const sortBy = require('../../utils/lodash.sortby');
const _ = require('../../utils/lodash.min.js');

Page({
    data: {
        searchArray: [],
        array: [
            "北京", "上海"
        ],
        hosArray: [],
        txt: "地区",
        imgAddress: GLOBAL.SERVER + "/images/",
        hideMask: true,
        starOpen: false,
        selectStar: '等级',
        areaOpen: false,
        selectArea: '区域',
        orderOpen: false,
        selectOrder: '排序',
        filterOpen: false,
        selectFilter: '筛选',
        searchKey: "",
        pageName: ""
    },
    bindp: function (e) {
        this.setData({ index: e.detail.value })
    },
    gotoHosDetail: function (e) {
        wx.navigateTo({
            url: '../hospitalDetail/hospitalDetail?id=' + e.currentTarget.dataset.itemId + '&pageName=' + this.data.pageName
        });
    },
    onLoad: function (e) {
        this.data.pageName = e.pageName;
        var hospitalSvc = new HospitalSvc();
        hospitalSvc.getLocation().then(data => {
            wx.showToast({ title: '加载中', icon: 'loading', duration: 10000, mask: true });
            var dataList = data.data.data;

            for (let i = 0; i < dataList.length; i++) {
                if (dataList[i].date == '未知') {
                    dataList[i].s = dataList[i].e = 999;
                } else {
                    if (dataList[i].date.indexOf('-') != -1) {
                        let arr = dataList[i].date.split('-');
                        dataList[i].s = parseInt(arr[0]);
                        dataList[i].e = parseInt(arr[1]);
                    } else {
                        let date = parseInt(dataList[i].date);
                        dataList[i].s = date;
                        dataList[i].e = 0;
                    }
                }

                if (dataList[i].distance != '未知') {
                    dataList[i].d = parseFloat(dataList[i].distance);
                } else {
                    dataList[i].d = 9999;
                }

                if (dataList[i].price != '未知') {
                    dataList[i].p = parseFloat(dataList[i].price.replace('顺产：', ''));
                } else {
                    dataList[i].p = 99999;
                }
            }
            dataList = _.orderBy(dataList, ['d', 's', 'e', 'p'], ['asc','asc','asc','asc']);

            this.setData({
                searchArray: dataList, //查询结果
                hosArray: dataList //全部列表
            })
            wx.hideToast();
        }).catch((err) => {
            wx.hideToast();
        });
    },
    searchFunc: function (e) {
        if (e.detail.value == "") {
            this.setData({ searchKey: '' })
        } else {
            this.setData({ searchKey: e.detail.value })
        }
        this.search();
    },
    //筛选方法
    search: function () {
        let list = this.data.hosArray;
        if (this.data.searchKey != "") {
            list = _.filter(list, (item) => {
                return item.name.indexOf(this.data.searchKey) >= 0
            })
        }
        if (this.data.selectStar != "等级") {
            list = _.filter(list, (item) => {
                return item.level.indexOf(this.data.selectStar) >= 0
            });
        }
        if (this.data.selectArea != "区域") {
            list = _.filter(list, (item) => {
                return item.district.indexOf(this.data.selectArea) >= 0
            });
        }
        if (this.data.selectOrder != "排序") {
            if (this.data.selectOrder == "距离") {
                list = _.sortBy(list, ['d', 's', 'e', 'p']);
            } else if (this.data.selectOrder == "口碑") {
                list = _.orderBy(list,  ['score','d', 's', 'e', 'p'], ['desc','asc','asc','asc','asc']);
            } else if (this.data.selectOrder == "生产费用") {
                list = _.sortBy(list, ['p', 's', 'e', 'd']);
            } else if (this.data.selectOrder == "建卡时间") {
                list = _.sortBy(list, ['s', 'e', 'p', 'd']);
            }
        }
        if (this.data.selectFilter != "筛选") {
            list = _.filter(list, (item) => {
                var hasTerms = false;

                for (let i = 0; i < item.terms[0].docs.length; i++) {
                    if (item.terms[0].docs[i].name == this.data.selectFilter) {
                        if (item.terms[0].docs[i].isHas) {
                            hasTerms = true;
                        }
                        break;
                    }
                }

                if (!hasTerms) {
                    for (let i = 0; i < item.terms[0].docs.length; i++) {
                        if (item.terms[1].docs[i].name == this.data.selectFilter) {
                            if (item.terms[1].docs[i].isHas) {
                                hasTerms = true;
                            }
                            break;
                        }
                    }
                }

                return hasTerms;
            });
        }
        this.setData({ searchArray: list })
    },
    containerClick: function (e) {
        this.setData({ starOpen: false, areaOpen: false, orderOpen: false, filterOpen: false, hideMask: true })
    },
    //等级
    starFilter: function (e) {
        this.setData({
            starOpen: !this.data.starOpen,
            hideMask: this.data.starOpen ? true : false
        });
    },
    selectStar: function (e) {
        this.setData({ selectStar: e.target.dataset.value, starOpen: false, hideMask: true });
        this.search();
    },
    //区域
    areaFilter: function (e) {
        this.setData({
            areaOpen: !this.data.areaOpen,
            hideMask: this.data.areaOpen
                ? true
                : false
        });
    },
    selectArea: function (e) {
        this.setData({ selectArea: e.target.dataset.value, areaOpen: false, hideMask: true });
        this.search();
    },
    //排序
    orderFilter: function (e) {
        this.setData({
            orderOpen: !this.data.orderOpen,
            hideMask: this.data.orderOpen
                ? true
                : false
        });
    },
    selectOrder: function (e) {
        this.setData({ selectOrder: e.target.dataset.value, orderOpen: false, hideMask: true });
        this.search();
    },
    //筛选
    filterFilter: function (e) {
        this.setData({
            filterOpen: !this.data.filterOpen,
            hideMask: this.data.filterOpen
                ? true
                : false
        });
    },
    selectFilter: function (e) {
        this.setData({ selectFilter: e.target.dataset.value, filterOpen: false, hideMask: true });
        this.search();
    }
})
