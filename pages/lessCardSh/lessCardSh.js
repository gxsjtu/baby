Page({
    data: {
        fromStr: "",
        pageName: '',
        pageId:''
    },
    onLoad: function (param) {
        this.data.pageId = param.pageId;
        this.data.pageName = param.pageName;
        let option = '';
        if (param.pageName == 'birth') {
            //生育保险
            option = 'birth';
            var dList = [];
            dList.push("夫妻双方的身份证原件及复印件");
            dList.push("结婚证原件及复印件");
            dList.push("夫妻双方户口簿原件及复印件");
            dList.push("医疗机构出具的《生育医学证明》原件及复印件");
            dList.push("本人实名制银行结算账户卡（折）原件及复印件");
            dList.push("根据个人的不同情况，还需分别携带下列材料：");
            dList.push("①委托他人办理的，需携带委托书和被委托人身份证原件及复印件");
            if (param.from != 'native') {
                dList.push("②对于外省市户籍的生育妇女，需携带准生证");
                dList.push("③对于在外省市生育的妇女，需携带县级以上医院出具的注明产妇生育情况（难产或顺产）的出院小结和小孩《出生医学证明》");
            }
            dList.push("申办表格本人需填写《生育保险待遇申领单》（申领6）");
            getApp().globalData.dataList = dList;
        }
        else if (param.pageName == 'lessCard') {
            option = param.from;
        }
        if (param.from == 'native') {
            this.data.option = 1;
        }
        else {
            this.data.option = 2;
        }
        this.getPageData(option);
        this.data.fromStr = param.fromStr;
    },
    getPageData: function (option) {
        if (option == 'native') {
            wx.setNavigationBarTitle({
                title: '办理小卡攻略'
            });
            this.setData({
                credentials: [
                    {
                        name: '身份证',
                        src: '../../assets/images/credential1.jpg'
                    }, {
                        name: '户口本',
                        src: '../../assets/images/babyCensus1.jpg'
                    }, {
                        name: '结婚证',
                        src: '../../assets/images/credential3.jpg'
                    }, {
                        name: '早期检查单（医院开具或现场检查）',
                        src: '../../assets/images/credential2.jpg'
                    }
                ], name: '注意事项',
                header: '上海本市户籍小卡办理攻略',
                address: '孕妈户籍所在地社区医院',
                notes: ['1. 双方身份证、双方户口本、双方结婚证、早期检查单（医院开具或现场检查）',
                    '2. 通常办事机构会留存复印件，请提前自备，以节省办事时间']
            });
        }
        else if (option == 'other') {
            wx.setNavigationBarTitle({
                title: '办理小卡攻略'
            });
            this.setData({
                credentials: [
                    {
                        name: '身份证',
                        src: '../../assets/images/credential1.jpg'
                    }, {
                        name: '户口本',
                        src: '../../assets/images/babyCensus1.jpg'
                    }, {
                        name: '结婚证',
                        src: '../../assets/images/credential3.jpg'
                    }, {
                        name: '早期检查单（医院开具或现场检查）',
                        src: '../../assets/images/credential2.jpg'
                    }, {
                        name: '居住证',
                        src: '../../assets/images/credential5.jpg'
                    },
                    {
                        name: '医保卡',
                        src: '../../assets/images/babyCensus2.jpg'
                    },
                    {
                        name: '联系卡',
                        src: '../../assets/images/credential4.jpg'
                    }
                ], name: '注意事项',
                header: '外省市户籍小卡办理攻略',
                address: '孕妈居住所在地社区医院',
                notes: ['1. 双方身份证、双方户口本、双方结婚证、早期检查单（医院开具或现场检查）、居住证及复印件（正反面）或租房合同',
                    '2. 通常办事机构会留存复印件，请提前自备，以节省办事时间',
                    '3. 部分社区医院可能需要：医保卡、居委会开的孕情单']
            });
        }
        else if (option == 'birth') {
            // wx.setNavigationBarTitle({
            //     title: '申请生育保险攻略'
            // });
            let notes = ['1、夫妻双方的身份证原件及复印件；',
                '2、结婚证原件及复印件；',
                '3、夫妻双方户口簿原件及复印件；',
                '4、医疗机构出具的《生育医学证明》原件及复印件；',
                '5、本人实名制银行结算账户卡（折）原件及复印件；',
                '6、根据个人的不同情况，还需分别携带下列材料：',
                '①委托他人办理的，需携带委托书和被委托人身份证原件及复印件；'];
            if (this.data.option == 2) {
                notes.push('②对于外省市户籍的生育妇女，需携带准生证；');
                notes.push('③对于在外省市生育的妇女，需携带县级以上医院出具的注明产妇生育情况（难产或顺产）的出院小结和小孩《出生医学证明》；');
            }
            notes.push('申办表格本人需填写《生育保险待遇申领单》（申领6）。');
            this.setData({
                credentials: [],
                header: '申报生育保险攻略',
                address: '各区县街道（社区）事务受理中心',
                name: '办事材料',
                notes: notes
            });
        }
    },
    gotoOption: function (e) {
        wx.navigateTo({ url: '../lessCardOptions/lessCardOptions?type=' + this.data.option + '&pageId=' + this.data.pageId + '&fromStr=' + this.data.fromStr + '&pageName=' + this.data.pageName }); //上海
    },
    gotoSummary: function (e) {
        getApp().globalData.resultStreets = [];//点击暂不需要 清空事务中心或者医院或者派出所列表 小结页不显示
        wx.navigateTo({ url: '../lessCardSummary/lessCardSummary?type=' + this.data.option + '&delta=n&pageId=' + this.data.pageId + '&fromStr=' + this.data.fromStr + '&pageName=' + this.data.pageName }); //外省
    }
})
