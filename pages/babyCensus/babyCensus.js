Page({
    data: {
        fromStr: "",
        typeStr: "1",
        pageId: ""
    },
    onLoad: function(param) {
        this.getPageData(param.do );
            this.data.fromStr = param.fromStr; //区别‘社区医院’四个字
                    this.data.typeStr = param.type; //区别本市还是外省
                    this.data.pageId = param.pageId; //区别title
                    console.log('111');
            console.log(this.data.pageId);
        },
        needClick : function() {
            wx.navigateTo({
                url: '../lessCardOptions/lessCardOptions?type=' + this.data.typeStr + '&fromStr=' + this.data.fromStr + '&pageId=' + this.data.pageId
            }); //上海
        },
        noNeedClick : function() {
            wx.navigateTo({
                url: '../lessCardSummary/lessCardSummary?type=' + this.data.typeStr + '&delta=n&fromStr=' + this.data.fromStr
            }); //外省
        },
        getPageData : function(option) {
            if (option == 'census') {
                wx.setNavigationBarTitle({title: '申报新生儿户口'});
                this.setData({
                    header: '新生儿户籍办理攻略',
                    title: {
                        title: '申报户口',
                        desc: '婴儿可以在本市父或母户口所在地公安派出所办理出生登记，并统一登记为非农业户口。'
                    },
                    image: {
                        src: '../../assets/images/babyCensus1.jpg',
                        name: '户口本',
                        width: '680',
                        height: '408'
                    },
                    note: [
                        {
                            title: '所需材料:',
                            items: ['1、《出生医学证明》；', '2、父亲《结婚证》；', '3、父母双方的《居民户口簿》；', '4、父母双方的《居民身份证》或现役军人身份证件或《中华人民共和国护照》或《中华人民共和国旅行证》；', '5、监护人的书面申请；']
                        }, {
                            title: '办理机构：',
                            items: ['父亲或母亲户籍所在地街道派出所户籍窗口']
                        }
                    ]
                });

            } else if (option == 'medical') {
                wx.setNavigationBarTitle({title: '办理宝宝医疗保险'});
                this.setData({
                    header: '少儿居民医保办理攻略',
                    title: {
                        title: '少儿居民医保',
                        desc: '为了保障少年儿童健康成长，我国推行并鼓励为儿童参加医疗保险。上海城镇居民医疗保险参保登记受理工作一般为每年的10-12月，请各位家长及时为儿童参加医疗保险，领取医保卡。'
                    },
                    image: {
                        src: '../../assets/images/babyCensus2.jpg',
                        name: '医保卡',
                        width: '680',
                        height: '458'
                    },
                    note: [
                        {
                            title: '参加对象:',
                            items: ['1、本市户籍幼儿', '2、持有上海居住证并且积分达到120分的人员子女。', '3、引进人才子女B类（CR、FR等开头），外籍人员']
                        }, {
                            title: '收费标准：',
                            items: ['2016年度每人110元']
                        }, {
                            title: '缴费方式：',
                            items: ['1、就近的街道（社区）事务受理中心办理缴费', '2、每年10-12月份办理缴费手续。']
                        }, {
                            title: '保障年度',
                            items: ['2017年1-12月']
                        }
                    ]
                });
            } else if (option == 'fund') {
                wx.setNavigationBarTitle({title: '办理少儿住院互助基金'});
                this.setData({
                    header: '少儿住院互助基金办理攻略',
                    title: {
                        title: '上海市少儿住院互助基金',
                        desc: '少儿住院互助基金是由上海市红十字会、上海市教育委员会、上海市卫生和计划生育委员会于1996年9月共同创建的公益性、非营利的医疗保障互助基金，覆盖了全市近220万名18岁及以下少年儿童，是本市少年儿童基本医疗保障制度的一个重要组成部分。'
                    },
                    image: {
                        src: '../../assets/images/babyCensus3.jpg',
                        name: '医疗证',
                        width: '680',
                        height: '1006'
                    },
                    note: [
                        {
                            title: '参加对象:',
                            items: ['1、中小学校（含中专、职校、技校、特殊学校）在册学生和入托入园在册儿童。', '2、本市户籍的18周岁以下未入学散居少儿（包括《上海市居住证》达标准积分人员同住子女）。']
                        }, {
                            title: '收费标准：',
                            items: ['2016学年（2016.9-2017.8）每人80元。']
                        }, {
                            title: '缴费方式：',
                            items: ['1、在校（园）的学生，向所在学校、幼儿园专门设立的少儿住院互助基金缴费窗口直接缴纳参保费；', '2、其他散居少儿，到户籍（《上海市居住证》）所在地的社区卫生服务中心缴纳参保费。']
                        }, {
                            title: '保障年度',
                            items: ['1、以学年度计算，即当年的9月1日至次年的8月31日。', '2、新生儿自出生之日起享受待遇；其他中途参加的少儿自交费之日起享受待遇。']
                        }
                    ]
                });
            }
        }
    })
