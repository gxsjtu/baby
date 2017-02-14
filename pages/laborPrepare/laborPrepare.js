const GLOBAL = require('../../global.js');
// var clone = require('../../utils/lodash.clone');
var _ = require('../../utils/lodash.min.js');
Page({
    data: {
        warning: [],
        cards: [],
        documents: [],
        firstItemSelected: true
    },
    naturalLabour: function (e) {
        this.setData({
            firstItemSelected: true
        });
        this.getPageData();
    },
    cesarean: function (e) {
        this.setData({
            firstItemSelected: false
        });
        this.getPageData();
    },
    onLoad: function () {
        this.getPageData();
    },
    getPageData: function () {
        let arrWarning = [];
        let arrCard = [];

        if (this.data.firstItemSelected) {
            arrWarning.push('阴道流血；如果阴道流血量超过月经期量，需立即到医院就诊');
            arrWarning.push('腹痛；宫缩出现规律，需要及时到医院');
            arrWarning.push('胎膜早破；指淡黄色或白色的水流出，一定立即到医院就诊');
            arrWarning.push('胎动异常；按平时胎动为基础，明显减少或明显增多，立即到医院就诊');

            arrCard.push('出现临产征兆：宫缩；破水；见红等需立即到医院');
            arrCard.push('第一产程:从临产至宫口开全(10厘米)，可分为两个阶段：潜伏期和活跃期');
            arrCard.push('第二产程:从宫口开全到胎儿娩出');
            arrCard.push('第三产程:始自胎儿娩出直至胎盘娩出');
            arrCard.push('产前进食多以碳水化合物、半流质软食为主');
            arrCard.push('产后进食多以易消化清淡的流质或半流质饮食，如汤面、水煮蛋、馄饨等');
        }
        else {
            arrWarning.push('手术前6-8小时就开始禁止进食水和饮料');
            arrWarning.push('手术前一天餐要清淡，早睡以便保证精神和体力');
            arrWarning.push('术前沐浴，时间不宜过长，以防感冒');

            arrCard.push('术前护士给予皮肤准备，及导尿');
            arrCard.push('术后应该多翻身');
            arrCard.push('卧床宜取半卧位');
            arrCard.push('保持阴部及腹部切口清洁');
            arrCard.push('不要进食胀气食物；多以流质食物为主');
            arrCard.push('产褥期绝对禁止房事');
        }

        this.setData({ warning: arrWarning, cards: arrCard });
    }
})
