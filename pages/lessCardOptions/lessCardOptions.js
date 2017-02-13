const LocationSvc = require("../../services/locationSvc.js");
const _ = require("../../utils/lodash.min.js");

Page({
    data: {
        resultStreets:[],//过滤后的街道列表
        streets: [],//街道
        districts: [],//区
        areaOpen: false,
        selectArea: "区域",
        hideMask: true,
        selectStreet: "街道",
        streetOpen: false,
        addr: "户籍地址" //居住地址
    },
    onLoad: function () {
        var locationSvc = new LocationSvc();
        locationSvc.getDistricts().then(data => {
            this.setData({
                districts: data
            })
        })
        locationSvc.getCurrentLocation().then(data => {
            if (data.data.message == "OK") {
                this.setData({
                    selectArea: data.data.data
                })
                locationSvc.getStreetsByDistrict(data.data.data).then(data => {
                    console.log('sss');
                    this.setData({
                        streets: data.streets,
                        resultStreets: data.streets
                    })
                })
            }
        })
    },
    selectArea: function (e) {
        var dis = e.target.dataset.value;
        var locationSvc = new LocationSvc();
        // this.setData({ selectArea: e.target.dataset.value, areaOpen: false, hideMask: true });
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
        var strs = _.filter(this.data.streets, (street) => {
            return street.name == selectS;
        })

        this.setData({ selectStreet: selectS, streetOpen: false, hideMask: true, resultStreets: strs });
    },
    containerClick: function (e) {
        this.setData({ areaOpen: false, streetOpen: false, hideMask: true })
    },
})