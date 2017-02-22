const GLOBAL = require('../../global.js');
// var clone = require('../../utils/lodash.clone');
var _ = require('../../utils/lodash.min.js');
const ActionSvc = require("../../services/actionSvc.js");
var optIn = require('../../utils/optIn.js');

Page({
    data: {
        warning: [],
        cards: [],
        documents: [],
        firstItemSelected: true,
        pageName: '',
        hospitalId: '',
        showMask: false,
        optIn: {
            num: 0,
            enable: [true, true, true],
            showError: false
        },
        isXZHid: true,
        scrollHeight:"",
        animationData: {},
        modalBottom: ""
    },
    naturalLabour: function (e) {
        this.setData({
            firstItemSelected: true
        });
        this.getPageData();
        optIn.setOptInData(this);
    },
    cesarean: function (e) {
        this.setData({
            firstItemSelected: false
        });
        this.getPageData();
    },
    onLoad: function (e) {
         wx.getSystemInfo({
            success: (res) => {
                var h = (res.windowHeight / 2 - 150) + "px";
                var s = (res.windowHeight - 269) + "px";
                this.setData({
                    modalBottom: h,
                    scrollHeight: s
                })
            }
        })
        this.data.pageName = e.pageName;
        optIn.setOptInData(this);
        var actionSvc = new ActionSvc()
        actionSvc.getModalByPageName(this.data.pageName).then(data => {
            this.setData({ xzType: data });
        })
        this.getPageData();
        optIn.setOptInData(this);
    },
    getPageData: function () {
        let arrWarning = [];
        let arrCard = [];

        if (this.data.firstItemSelected) {
            arrWarning.push('阴道流血；如果阴道流血量超过月经期量，需立即到医院就诊');
            arrWarning.push('腹痛；宫缩出现规律，需要及时到医院');
            arrWarning.push('胎膜早破；指淡黄色或白色的水流出，一定立即到医院就诊');
            arrWarning.push('胎动异常；按平时胎动为基础，明显减少或明显增多，立即到医院就诊');

            arrCard.push({ name: '出现临产征兆：宫缩；破水；见红等需立即到医院', steps: ['宫缩:子宫收缩,强度加强,持续时间延长,间隔时间变短就告知护士', '破水(阴道流水):是羊膜破裂使羊水从阴道中流出,无色略带腥味', '见红:当子宫颈慢慢张卡,阴道会排出少量粘液,如超过月经量,通知医务人员'] });
            arrCard.push({ name: '第一产程:从临产至宫口开全(10厘米)，可分为两个阶段：潜伏期和活跃期', steps: ['潜伏期：宫缩逐渐加强，宫颈管消失至宫口开大到4厘米', '活跃期：宫口开4厘米至开全，先露部进入中骨盆'] });
            arrCard.push({ name: '第二产程:从宫口开全到胎儿娩出', steps: ['自然分娩时,在宫缩的同时学会正确屏气向下用力，调动腹直肌和肛提肌的力量帮助胎儿顺利娩出'] });
            arrCard.push({ name: '第三产程:始自胎儿娩出直至胎盘娩出', steps: ['胎儿娩出后,在1〜2次宫缩后胎盘开始剥离,出现少量出血。此时在医护人员的指导下用力屏气,协助胎盘娩出'] });
            arrCard.push({ name: '产前进食多以碳水化合物、半流质软食为主', steps: ['多数产妇在临近分娩心情比较紧张，胃口不好，所以应进食便于消化吸收的食物'] });
            arrCard.push({ name: '产后进食多以易消化清淡的流质或半流质饮食，如汤面、水煮蛋、馄饨等', steps: ['由于产后数周内脾胃功能亦处于虚弱状态,因此进食量应采取渐进增加的方式', '食物品种要多种多样,并初期以容易消化为主'] });
        }
        else {
            arrWarning.push('手术前6-8小时就开始禁止进食水和饮料');
            arrWarning.push('手术前一天餐要清淡，早睡以便保证精神和体力');
            arrWarning.push('术前沐浴，时间不宜过长，以防感冒');

            arrCard.push({ name: '术前护士给予皮肤准备，及导尿', steps: ['用剃毛刀刮去腹部、腰部等处毛发', '安放导尿管，腹部皮肤初次消毒'] });
            arrCard.push({ name: '术后应该多翻身', steps: ['麻醉药物可会导致腹胀，产后宜多做翻身动作以便促进肠道内的气体尽快排出'] });
            arrCard.push({ name: '卧床宜取半卧位', steps: ['采取半卧位并配合多翻身，促使恶露排出'] });
            arrCard.push({ name: '保持阴部及腹部切口清洁', steps: ['全身清洁宜采用擦浴，但在恶露未排干净之前一定要禁止盆浴'] });
            arrCard.push({ name: '不要进食胀气食物；多以流质食物为主', steps: ['术后约24小时，胃肠功能才可恢复', '前三天多以流质食物为主'] });
            arrCard.push({ name: '产褥期绝对禁止房事', steps: ['剖腹产术后100天，如果阴道不再出血，经医生检查伤口愈合情况良好，可以恢复性生活'] });
        }

        this.setData({ warning: arrWarning, cards: arrCard });
    },
    clickDesc: function (e) {
        //勿删
    },
    hideMask: function (e) {
        this.setData({
            showDesc: false,
            showMask: false,
            isXZHid: true,
            'optIn.showError': false
        });
    },
    usefulClick: function (e) {
        //点赞
        optIn.usefulClick(this);
    },
    medalClick: function (e) {
        optIn.medalClick(this);
    },
    errorClick: function (e) {
        optIn.errorClick(this);
    },
    hidAnimat: function () {
        this.setData({
            isXZHid: true,
            showMask: false
        })
    },
    confirmInfo: function (e) {
        let inputValue = e.detail.value;
        optIn.confirmInfo(this, inputValue);
    }
})
