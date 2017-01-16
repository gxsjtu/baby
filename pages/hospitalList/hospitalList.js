const HospitalListSvc = require('../../services/hospitalListSvc.js')
const GLOBAL = require('../../global.js');
const filter = require('../../utils/lodash.filter');

Page({
    data: {
        searchArray: [],
        array: [
            "北京", "上海"
        ],
        hosArray: [],
        txt: "地区",
        imgAddress: GLOBAL.SERVER + "/images/",
        hideMask:true,
        starOpen: false,
        selectStar:'等级',
        areaOpen: false,
        selectArea:'区域',
        orderOpen: false,
        selectOrder:'智能排序',
        filterOpen: false,
        selectFilter:'筛选'
        // searchKey:""
    },
    bindp: function(e) {
        this.setData({index: e.detail.value})
    },
    gotoHosDetail: function(e){
         wx.navigateTo({ url: '../hospitalDetail/hospitalDetail?id=' + e.currentTarget.dataset.itemId });
    },
    onLoad: function() {
        wx.showToast({title: '加载中', icon: 'loading', duration: 10000, mask: true});
        var hospitalSvc = new HospitalListSvc();
        hospitalSvc.getLocation().then(data => {
          var dataList = data.data.data;
            this.setData({
                searchArray: dataList, //查询结果
                hosArray: dataList//全部列表
            })
           wx.hideToast();
        }).catch((err) => {
            wx.hideToast();
        });
    },
    searchFunc: function(e) {
        if (e.detail.value == "") {
            this.setData({
                searchArray: this.data.hosArray, //查询结果
            })
        } else {
            var list = [];
            list = filter(this.data.hosArray, function(item) {
                return item.name.indexOf(e.detail.value) >= 0
            })
            this.setData({searchArray: list})
        }
    },
    containerClick:function(e){
      this.setData({starOpen:false,areaOpen:false,orderOpen:false,filterOpen:false,hideMask:true})
    },
    starFilter:function(e)
    {
      this.setData({starOpen:!this.data.starOpen,hideMask:this.data.starOpen?true:false});
    },
    selectStar:function(e){
        this.setData({selectStar:e.target.dataset.value,starOpen:false,hideMask:true});
    },
    areaFilter:function(e)
    {
      this.setData({areaOpen:!this.data.areaOpen,hideMask:this.data.areaOpen?true:false});
    },
    selectArea:function(e){
        this.setData({selectArea:e.target.dataset.value,areaOpen:false,hideMask:true});
    },
    orderFilter:function(e)
    {
      this.setData({orderOpen:!this.data.orderOpen,hideMask:this.data.orderOpen?true:false});
    },
    selectOrder:function(e){
        this.setData({selectOrder:e.target.dataset.value,orderOpen:false,hideMask:true});
    },
    filterFilter:function(e)
    {
      this.setData({filterOpen:!this.data.filterOpen,hideMask:this.data.filterOpen?true:false});
    },
    selectFilter:function(e){
        this.setData({selectFilter:e.target.dataset.value,filterOpen:false,hideMask:true});
    }
})
