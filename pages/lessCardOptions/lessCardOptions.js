const LocationSvc = require("../../services/locationSvc.js");
const _ = require("../../utils/lodash.min.js");

Page({
    data: {
        resultStreets: [], //过滤后的街道列表
        streets: [], //街道
        districts: [], //区
        areaOpen: false,
        selectArea: "区域",
        hideMask: true,
        selectStreet: "街道",
        streetOpen: false,
        addr: "户籍地址", //居住地址
        typeStr: 1,
        addrDetail: "",
        typeName: "社区医院",
        fromStr: "",
        pageId: "",
        bsHidden: true,
        jcHidden: true,
        yyHidden: true,
        ishid: true,
        pageName: ''
    },
    onLoad: function (e) {
        var pId = e.pageId;
        this.data.pageId = pId;
        var fromStr = e.fromStr;
        this.data.fromStr = fromStr;
        this.data.pageName = e.pageName;
        if (pId == "23") {
            wx.setNavigationBarTitle({ title: '申报新生儿户口' });
        } else if (pId == "24") {
            wx.setNavigationBarTitle({ title: '办理宝宝医疗保险' });
        } else if (pId == "25") {
            wx.setNavigationBarTitle({ title: '办理少儿住院互助基金' });
        } else if (pId == "26") {
            wx.setNavigationBarTitle({ title: '申报生育保险' });
        }
        else {
            wx.setNavigationBarTitle({ title: '办理小卡攻略' });
        }

        // if (pId != "23" && pId != "24" && pId != "25" && pId != "26") {
        //     wx.setNavigationBarTitle({ title: '办理小卡攻略' });
        // }


        if (fromStr == "1") {
            this.setData({ typeName: "社区医院", jcHidden: true, bsHidden: true, yyHidden: false })
        } else if (fromStr == "2") {
            this.setData({ typeName: "派出所", jcHidden: false, bsHidden: true, yyHidden: true })
        } else if (fromStr == "3") {
            this.setData({ typeName: "事务受理中心", jcHidden: true, bsHidden: false, yyHidden: true })
        }
        var address = getApp().globalData.user.address;
        var districtStr = "";
        var streetStr = "";
        var detailStr = "";
        if (e.type == "1") {
            this.setData({ addr: "户籍地址", typeStr: 1 })
            if (address != null && address != undefined) {
                districtStr = address.huJi.district;
                streetStr = address.huJi.street;
                detailStr = address.huJi.detail;
            }
        } else {
            this.setData({ addr: "居住地址", typeStr: 2 })
            if (address != null && address != undefined) {
                districtStr = address.juZhu.district;
                streetStr = address.juZhu.street;
                detailStr = address.juZhu.detail;
            }
        }

        var locationSvc = new LocationSvc();
        locationSvc.getDistricts().then(data => {
            this.setData({ districts: data })
        })

        var address = getApp().globalData.user.address;
        if (address != null && address != undefined) {
            locationSvc.getStreetsByDistrict(districtStr).then(data => {

                var strs = [];
                if (streetStr != "" && streetStr != "街道" && streetStr != "区域") {
                    strs = _.filter(data.streets, (street) => {
                        return street.name == streetStr;
                    })
                } else {
                    strs = data.streets;
                    streetStr = "街道";
                }

                this.setData({ streets: data.streets, resultStreets: strs, selectArea: districtStr, selectStreet: streetStr, addrDetail: detailStr })
                if (this.data.resultStreets != null && this.data.resultStreets != undefined && this.data.resultStreets.length > 0) {
                    this.setData({ ishid: false });
                }
                else {
                    this.setData({ ishid: true });
                }
            })
        } else {
            locationSvc.getCurrentLocation().then(data => {
                if (data.data.message == "OK") {
                    this.setData({ selectArea: data.data.data })
                    locationSvc.getStreetsByDistrict(data.data.data).then(data => {
                        this.setData({ streets: data.streets, resultStreets: data.streets })
                        if (this.data.resultStreets != null && this.data.resultStreets != undefined && this.data.resultStreets.length > 0) {
                            this.setData({ ishid: false });
                        }
                        else {
                            this.setData({ ishid: true });
                        }
                    })
                }
            })
        }
    },
    selectArea: function (e) {
        var dis = e.target.dataset.value;
        var locationSvc = new LocationSvc();
        locationSvc.getStreetsByDistrict(dis).then(data => {
            this.setData({
                resultStreets: data.streets,
                streets: data.streets,
                selectArea: dis,
                areaOpen: false,
                hideMask: true,
                selectStreet: "街道"
            })
            if (this.data.resultStreets != null && this.data.resultStreets != undefined && this.data.resultStreets.length > 0) {
                this.setData({ ishid: false });
            }
            else {
                this.setData({ ishid: true });
            }
        })
    },
    areaFilter: function (e) {
        this.setData({
            areaOpen: !this.data.areaOpen,
            hideMask: this.data.areaOpen
                ? true
                : false
        });
    },
    streetFilter: function (e) {
        this.setData({
            streetOpen: !this.data.streetOpen,
            hideMask: this.data.streetOpen
                ? true
                : false
        });
    },
    selectStreet: function (e) {
        var selectS = e.target.dataset.value;

        if (selectS == "街道") {
            var locationSvc = new LocationSvc();
            locationSvc.getStreetsByDistrict(this.data.selectArea).then(data => {
                this.setData({ resultStreets: data.streets, streetOpen: false, hideMask: true, selectStreet: selectS })
                if (this.data.resultStreets != null && this.data.resultStreets != undefined && this.data.resultStreets.length > 0) {
                    this.setData({ ishid: false });
                }
                else {
                    this.setData({ ishid: true });
                }
            })
        } else {
            var strs = _.filter(this.data.streets, (street) => {
                return street.name == selectS;
            })

            this.setData({ selectStreet: selectS, streetOpen: false, hideMask: true, resultStreets: strs });
            if (this.data.resultStreets != null && this.data.resultStreets != undefined && this.data.resultStreets.length > 0) {
                this.setData({ ishid: false });
            }
            else {
                this.setData({ ishid: true });
            }
        }

    },
    containerClick: function (e) {
        this.setData({ areaOpen: false, streetOpen: false, hideMask: true })
    },
    inputDetail: function (e) {
        this.setData({ addrDetail: e.detail.value })
        var locationSvc = new LocationSvc();
        locationSvc.getByDetail(this.data.addrDetail).then(data => {
            if (data.data.message == "OK") {
                locationSvc.getDetailByName(data.data.data.district).then(data => {
                    this.setData({ resultStreets: data.obj, streets: data.streets, selectArea: data.districtName, selectStreet: data.obj[0].name })
                })
                if (this.data.resultStreets != null && this.data.resultStreets != undefined && this.data.resultStreets.length > 0) {
                    this.setData({ ishid: false });
                }
                else {
                    this.setData({ ishid: true });
                }
            }
            else {
                this.setData({ resultStreets: [], ishid: true });
            }
        })
    },
    allComplete: function (e) {
        var street = "";
        if (this.data.selectStreet != "街道" && this.data.selectStreet != "" && this.data.selectStreet != undefined && this.data.selectStreet != null) {
            street = this.data.selectStreet;
        }
        var locationSvc = new LocationSvc();
        locationSvc.completeAll(this.data.typeStr, this.data.selectArea, street, this.data.addrDetail).then(data => {
            if (data.data.message == "OK") {
                getApp().globalData.resultStreets = this.data.resultStreets;
                if (this.data.typeStr == 1) {//本市
                    getApp().globalData.user.address.huJi.detail = this.data.addrDetail;
                    getApp().globalData.user.address.huJi.district = this.data.selectArea;
                    getApp().globalData.user.address.huJi.street = street;
                }
                else {
                    getApp().globalData.user.address.juZhu.detail = this.data.addrDetail;
                    getApp().globalData.user.address.juZhu.district = this.data.selectArea;
                    getApp().globalData.user.address.juZhu.street = street;
                }
                wx.navigateTo({
                    url: '../lessCardSummary/lessCardSummary?type=' + this.data.typeStr + '&delta=y' + '&pageId=' + this.data.pageId + '&fromStr=' + this.data.fromStr + '&pageName=' + this.data.pageName
                });
            }
        })
    }
})
