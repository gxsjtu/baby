const LocationSvc = require("../../services/locationSvc.js");
const _ = require("../../utils/lodash.min.js");

Page({
    data: {
        areaOpen: false,
        selectArea: "区域",
        hideMask: true,
        selectStreet: "街道",
        streetOpen: false
    },
    onLoad: function () {
        // var locationSvc = new LocationSvc();
        // locationSvc.getCurrentLocation().then(data => {
        //     console.log('sss');
        //     console.log(data);
        // })
    },
    selectArea: function (e) {
        this.setData({ selectArea: e.target.dataset.value, areaOpen: false, hideMask: true });
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
        this.setData({ selectStreet: e.target.dataset.value, streetOpen: false, hideMask: true });
    },
    containerClick: function (e) {
        this.setData({ areaOpen: false,streetOpen: false, hideMask: true })
    },
})