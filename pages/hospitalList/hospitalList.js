const HospitalListSvc = require('../../services/hospitalListSvc.js')
const GLOBAL = require('../../global.js');
const filter = require('../../utils/lodash.filter');
const sortBy = require('../../utils/lodash.sortby');
const concat = require('../../utils/lodash.concat');

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
        selectOrder:'排序',
        filterOpen: false,
        selectFilter:'筛选',
        searchKey:""
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
                searchKey:'',
            })
        } else {
            this.setData({
                searchKey:e.detail.value,
             })
        }
        this.search();
    },
    //筛选方法
    search:function(){
        let list = this.data.hosArray;
        if(this.data.searchKey != "")
        {
            list = filter(list,(item)=>{
                return item.name.indexOf(this.data.searchKey) >= 0
            })
            console.log(list);
        }
        if(this.data.selectStar !="等级")
        {
            list = filter(list, (item)=> {
                return item.level.indexOf(this.data.selectStar) >= 0
            });   
        }
        if(this.data.selectArea != "区域")
        {
            list = filter(list, (item)=> {
                return item.district.indexOf(this.data.selectArea) >= 0
            });
        }
        if(this.data.selectOrder != "排序")
        {
            if(this.data.selectOrder == "距离")
            {
                let noDistance = filter(list,(item)=>{
                    return item.name == '未知';
                });
                let hasDistance = filter(list,(item)=>{
                    return item.name != '未知';
                });
                hasDistance = sortBy(hasDistance,(item)=>{
                    return parseFloat(item.distance);
                });
                list = concat(hasDistance,noDistance);
            }
            else if(this.data.selectOrder == "口碑")
            {
                list = sortBy(list,(item)=>{
                    return -item.score;
                });
            }
            else if(this.data.selectOrder == "生产费用")
            {
                let noPrice = filter(list,(item)=>{
                    return item.price == '未知';
                });
                let hasPrice = filter(list,(item)=>{
                    return item.price != '未知';
                });
                console.log(noPrice);
                console.log(hasPrice);
                hasPrice = sortBy(hasDistance,(item)=>{
                    return parseFloat(item.distance.replace('顺产：',''));
                });
                console.log(hasPrice);
                list = concat(hasPrice,noPrice);
                console.log(list);
            }
            else if(this.data.selectOrder == "建卡时间")
            {

            }
        }
        if(this.data.selectFilter != "筛选")
        {
            
        }
        this.setData({
            searchArray: list
        })
    },
    containerClick:function(e){
      this.setData({starOpen:false,areaOpen:false,orderOpen:false,filterOpen:false,hideMask:true})
    },
    maskMove:function(e)
    {
        console.log('move');
    },
    //等级
    starFilter:function(e)
    {
      this.setData({starOpen:!this.data.starOpen,hideMask:this.data.starOpen?true:false});
    },
    selectStar:function(e){
        this.setData({selectStar:e.target.dataset.value,starOpen:false,hideMask:true});
        this.search();
    },
    //区域
    areaFilter:function(e)
    {
      this.setData({areaOpen:!this.data.areaOpen,hideMask:this.data.areaOpen?true:false});
    },
    selectArea:function(e){
        this.setData({selectArea:e.target.dataset.value,areaOpen:false,hideMask:true});
        this.search();
    },
    //排序
    orderFilter:function(e)
    {
      this.setData({orderOpen:!this.data.orderOpen,hideMask:this.data.orderOpen?true:false});
    },
    selectOrder:function(e){
        this.setData({selectOrder:e.target.dataset.value,orderOpen:false,hideMask:true});
        this.search();
    },
    //筛选
    filterFilter:function(e)
    {
      this.setData({filterOpen:!this.data.filterOpen,hideMask:this.data.filterOpen?true:false});
    },
    selectFilter:function(e){
        this.setData({selectFilter:e.target.dataset.value,filterOpen:false,hideMask:true});
        this.search();
    }
})
