//index.js
//获取应用实例
// var app = getApp()
Page({
  data: {
    firstItemSelected:true,//现在的页面是产前阶段还是产后阶段，产前为true
    //产前阶段数据
    beforeListData:[
      {id:1,title:'确认怀孕计算预产期',date:'(孕6-8周)'},
      {id:2,title:'选择查看生产医院',date:'(孕8-9周)'},
      {id:3,title:'医院建大卡产检',date:'(孕9-12周)'},
      {id:4,title:'唐氏筛查',date:'(孕11-13周)'},
      {id:5,title:'大排畸',date:'(孕20-22周)'},
      {id:6,title:'唐筛糖耐',date:'(孕22-24周)'},
      {id:7,title:'选择月嫂 / 月子中心',date:'(孕25-26周)'}
    ],
    //产后阶段数据
    afterListData:[
      {id:1,title:'出生医学证明',date:'(出生7天内)'},
      {id:2,title:'产后42天检查',date:'(出生6周)'},
      {id:3,title:'申报宝宝户口',date:'(宝宝出生后)'},
      {id:4,title:'办理宝宝医疗保险',date:'(宝宝出生后)'},
      {id:5,title:'办理少儿互助基金',date:'(宝宝出生后)'},
      {id:6,title:'申请生育保险',date:'(宝宝出生后)'}
    ]
  },
  onLoad: function () {
    this.beforeChildbirth();//初始默认进入产前阶段
  },
  //点击产前阶段
  beforeChildbirth: function (){
    this.setData({
      firstItemSelected: true
    })
  },
  //点击产后阶段
  afterChildbirth: function (){
    this.setData({
      firstItemSelected: false
    })
  }
})
