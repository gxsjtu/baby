const LocationSvc = require("../../services/locationSvc.js");
const _ = require("../../utils/lodash.min.js");

Page({
    data: {
        resultStreets: [],//过滤后的街道列表
        streets: [],//街道
        districts: [],//区
        areaOpen: false,
        selectArea: "区域",
        hideMask: true,
        selectStreet: "街道",
        streetOpen: false,
        addr: "户籍地址", //居住地址
        typeStr: 1,
        addrDetail: "",
        typeName: "社区医院",
        fromStr:""
    },
    onLoad: function (e) {
        var fromStr = e.fromStr;
        if(fromStr == "1"){
            this.setData({
                typeName: "社区医院"
            })
        }else if(fromStr == "2"){
            this.setData({
                typeName: "派出所"
            })
        }else if(fromStr == "3"){
            this.setData({
                typeName:"事务受理中心"
            })
        }
        var address = getApp().globalData.user.address;
        var districtStr = "";
        var streetStr = "";
        var detailStr = "";
        if (e.type == "1") {
            this.setData({
                addr: "户籍地址",
                typeStr: 1
            })
            if (address != null && address != undefined) {
                districtStr = address.huJi.district;
                streetStr = address.huJi.street;
                detailStr = address.huJi.detail;
            }
        }
        else {
            this.setData({
                addr: "居住地址",
                typeStr: 2
            })
            if (address != null && address != undefined) {
                districtStr = address.juZhu.district;
                streetStr = address.juZhu.street;
                detailStr = address.juZhu.detail;
            }
        }

        var locationSvc = new LocationSvc();
        locationSvc.getDistricts().then(data => {
            this.setData({
                districts: data
            })
        })

        var address = getApp().globalData.user.address;
        if (address != null && address != undefined) {
            locationSvc.getStreetsByDistrict(districtStr).then(data => {

                var strs = [];
                if (streetStr != "" && streetStr != "街道") {
                    strs = _.filter(data.streets, (street) => {
                        return street.name == streetStr;
                    })
                }
                else {
                    strs = data.streets;
                    streetStr = "街道";
                }

                if (detailStr != "" && detailStr != null && detailStr != undefined) {
                    locationSvc.getByDetail(this.data.addrDetail).then(data => {
                        if (data.data.message == "OK") {
                            locationSvc.getDetailByName(data.data.data.district).then(data => {
                                strs = data;
                            })
                        }
                    })
                }

                this.setData({
                    streets: data.streets,
                    resultStreets: strs,
                    selectArea: districtStr,
                    selectStreet: streetStr,
                    addrDetail: detailStr
                })
            })


        }
        else {
            locationSvc.getCurrentLocation().then(data => {
                if (data.data.message == "OK") {
                    this.setData({
                        selectArea: data.data.data
                    })
                    locationSvc.getStreetsByDistrict(data.data.data).then(data => {
                        this.setData({
                            streets: data.streets,
                            resultStreets: data.streets
                        })
                    })
                }
            })
        }
    },
    selectArea: function (e) {
        var dis = e.target.dataset.value;
        var locationSvc = new LocationSvc();
        locationSvc.getStreetsByDistrict(dis).then(data => {
            this.setData({ resultStreets: data.streets, streets: data.streets, selectArea: dis, areaOpen: false, hideMask: true, selectStreet: "街道" })
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
            })
        }
        else {
            var strs = _.filter(this.data.streets, (street) => {
                return street.name == selectS;
            })

            this.setData({ selectStreet: selectS, streetOpen: false, hideMask: true, resultStreets: strs });
        }
    },
    containerClick: function (e) {
        this.setData({ areaOpen: false, streetOpen: false, hideMask: true })
    },
    inputDetail: function (e) {
        this.setData({
            addrDetail: e.detail.value
        })

        var locationSvc = new LocationSvc();
        locationSvc.getByDetail(this.data.addrDetail).then(data => {
            if (data.data.message == "OK") {
                locationSvc.getDetailByName(data.data.data.district).then(data => {
                    this.setData({
                        resultStreets: data
                    })
                })
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
                wx.navigateTo({ url: '../lessCardSummary/lessCardSummary?type=' + this.data.typeStr + '&delta=y'});
            }
        })
    }
})